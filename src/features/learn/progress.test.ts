import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { courses } from "./courses";
import { attemptKey, initialLearnProgress, lessonMastery, readProgress, saveProgress, type LearnProgress } from "./progress";

const course = courses["ai-fundamentals"];
const stageCount = course.stages.length;

/** localStorage minimal supaya progress.ts bisa diuji tanpa jsdom. */
function installStorage() {
  const store = new Map<string, string>();
  const storage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
    clear: () => store.clear(),
    key: (index: number) => [...store.keys()][index] ?? null,
    get length() {
      return store.size;
    },
  } as Storage;
  Object.assign(globalThis, { window: globalThis, localStorage: storage });
  return store;
}

function write(value: unknown) {
  localStorage.setItem(course.progressKey, JSON.stringify(value));
}

describe("readProgress", () => {
  let store: Map<string, string>;

  beforeEach(() => {
    store = installStorage();
  });

  afterEach(() => {
    store.clear();
    Reflect.deleteProperty(globalThis, "window");
    Reflect.deleteProperty(globalThis, "localStorage");
  });

  it("mengembalikan nilai awal saat penyimpanan kosong", () => {
    expect(readProgress(course)).toEqual(initialLearnProgress);
  });

  it("tidak melempar untuk JSON sampah", () => {
    localStorage.setItem(course.progressKey, "{bukan json");
    expect(readProgress(course)).toEqual(initialLearnProgress);
  });

  it("menerima payload v2 lama tanpa penggantian kunci", () => {
    write({ completedStages: [0], unlockedStage: 1, activeStage: 1 });
    const progress = readProgress(course);
    expect(progress.completedStages).toEqual([0]);
    expect(progress.unlockedStage).toBe(1);
    expect(progress.sectionIndex).toBe(0);
    expect(progress.attempts).toEqual({});
  });

  it("membuang stage di luar jangkauan dan menghapus duplikat", () => {
    write({ completedStages: [2, 2, 0, 99, -1, "x"], unlockedStage: 9, activeStage: 9 });
    const progress = readProgress(course);
    expect(progress.completedStages).toEqual([0, 2]);
    expect(progress.unlockedStage).toBe(1);
  });

  it("menghormati pelajaran terakhir yang dibuka bila masih terbuka", () => {
    write({ completedStages: [0, 1], unlockedStage: 2, activeStage: 0 });
    expect(readProgress(course).activeStage).toBe(0);
  });

  it("menolak pelajaran yang belum terbuka", () => {
    write({ completedStages: [], activeStage: 2 });
    const progress = readProgress(course);
    expect(progress.unlockedStage).toBe(0);
    expect(progress.activeStage).toBe(0);
  });

  it("membatasi sectionIndex pada jumlah bagian pelajaran aktif", () => {
    const sections = course.lessons[0].sections.length;
    write({ completedStages: [], activeStage: 0, sectionIndex: 999 });
    expect(readProgress(course).sectionIndex).toBe(sections - 1);
    write({ completedStages: [], activeStage: 0, sectionIndex: -4 });
    expect(readProgress(course).sectionIndex).toBe(0);
    write({ completedStages: [], activeStage: 0, sectionIndex: 2.5 });
    expect(readProgress(course).sectionIndex).toBe(0);
  });

  it("membuang attempts yang bentuknya salah", () => {
    write({
      attempts: {
        "0-0-0": { tries: 1, solved: true, firstTryCorrect: true },
        "a-b-c": { tries: 1, solved: true, firstTryCorrect: true },
        "0-0": { tries: 1, solved: true, firstTryCorrect: true },
        [stageCount + "-0-0"]: { tries: 1, solved: true, firstTryCorrect: true },
        "1-0-0": "bukan objek",
      },
    });
    expect(Object.keys(readProgress(course).attempts)).toEqual(["0-0-0"]);
  });

  it("membatasi tries dan menyembuhkan firstTryCorrect yang kontradiktif", () => {
    write({
      attempts: {
        "0-0-0": { tries: 7, solved: true, firstTryCorrect: true },
        "0-1-0": { tries: -5, solved: false, firstTryCorrect: false },
        "0-2-0": { tries: 1e9, solved: true, firstTryCorrect: false },
      },
    });
    const attempts = readProgress(course).attempts;
    expect(attempts["0-0-0"]).toEqual({ tries: 7, solved: true, firstTryCorrect: false });
    expect(attempts["0-1-0"]).toEqual({ tries: 0, solved: false, firstTryCorrect: false });
    expect(attempts["0-2-0"].tries).toBe(99);
  });

  it("bolak-balik lewat saveProgress", () => {
    const progress: LearnProgress = {
      completedStages: [0],
      unlockedStage: 1,
      activeStage: 1,
      sectionIndex: 1,
      attempts: { [attemptKey(0, 4)]: { tries: 1, solved: true, firstTryCorrect: true } },
    };
    saveProgress(progress, course);
    expect(readProgress(course)).toEqual(progress);
  });
});

describe("lessonMastery", () => {
  it("menghitung yang selesai dan yang tepat di percobaan pertama", () => {
    const progress: LearnProgress = {
      ...initialLearnProgress,
      attempts: {
        "0-0-0": { tries: 1, solved: true, firstTryCorrect: true },
        "0-1-0": { tries: 3, solved: true, firstTryCorrect: false },
        "0-2-0": { tries: 2, solved: false, firstTryCorrect: false },
      },
    };
    expect(lessonMastery(progress, ["0-0-0", "0-1-0", "0-2-0"])).toEqual({ solved: 2, firstTry: 1, total: 3 });
  });
});
