"""Compile the reviewed Markdown into data that the lesson reader can import."""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/materi-pembelajaran-lengkap.md"
TARGET = ROOT / "src/features/learn/material-final.json"


def field(text, label):
    match = re.search(rf"^\*\*{re.escape(label)}:\*\* (.+)$", text, re.M)
    assert match, f"Missing {label}"
    return match.group(1).strip()


def choices(text):
    found = re.findall(r"^\d+\. (.+?) — (.+)$", text, re.M)
    assert found, "Missing choices"
    return [
        {"label": label.replace(" **(jawaban tepat)**", ""),
         "feedback": feedback,
         "correct": "**(jawaban tepat)**" in label}
        for label, feedback in found
    ]


def compile_material():
    text = SOURCE.read_text(encoding="utf-8")
    classes = re.findall(r"^## Kelas \d+: ([^\n]+)\n(.*?)(?=^## Kelas \d+: |\Z)", text, re.M | re.S)
    assert [name for name, _ in classes] == ["AI Fundamentals", "Working with Generative AI", "Vibe Coding"]
    result = []
    for class_title, class_text in classes:
        lesson_chunks = re.findall(r"^### Pelajaran \d+: ([^\n]+)\n(.*?)(?=^### (?:Pelajaran \d+:|Penutup kelas)|\Z)", class_text, re.M | re.S)
        lessons = []
        for lesson_title, lesson_text in lesson_chunks:
            question = field(lesson_text, "Pertanyaan utama")
            intro = lesson_text.split(f"**Pertanyaan utama:** {question}", 1)[1].split("\n#### ", 1)[0].strip()
            section_chunks = re.findall(r"^#### ([^\n]+)\n(.*?)(?=^#### |\Z)", lesson_text, re.M | re.S)
            sections = []
            for heading, body in section_chunks:
                if heading == "Penutup pelajaran":
                    takeaway = field(body, "Yang perlu diingat")
                    check = {"question": field(body, "Cek pemahaman"), "choices": choices(body)}
                    continue
                number, title = heading.split(" ", 1)
                activity = ""
                if "**Latihan interaktif**" in body:
                    body, activity = body.split("**Latihan interaktif**", 1)
                reflection = None
                reflected = re.search(r"\*\*Renungkan:\*\* ([^\n]+)\n\n\*\*Jawaban:\*\* ([^\n]+)", body)
                if reflected:
                    reflection = {"question": reflected.group(1), "answer": reflected.group(2)}
                    body = body[:reflected.start()] + body[reflected.end():]
                reveal = None
                explained = re.search(r"\*\*Pembahasan\*\*\n\n([^\n]+)", body)
                if explained:
                    reveal = explained.group(1)
                    body = body[:explained.start()] + body[explained.end():]
                sections.append({"number": number, "title": title, "body": body.strip(),
                                 "activity": activity.strip(), "reflection": reflection, "reveal": reveal})
            assert len(sections) > 0 and len(check["choices"]) >= 2
            lessons.append({"title": lesson_title, "question": question, "intro": intro,
                            "lead": intro, "sections": sections, "takeaway": takeaway, "check": check})
        closing = class_text.split("### Penutup kelas", 1)[1].split("**Lanjut:**", 1)[0].strip()
        hero_image = re.search(r"^!\[([^]]+)\]\(\.\./public([^\)]+)\)$", class_text, re.M)
        hero_credit = re.search(r"^\*\*Ilustrasi pembuka:\*\* (.+?) \[([^]]+)\]\((.+)\)\.$", class_text, re.M)
        assert hero_image and hero_credit
        result.append({"title": class_title, "label": field(class_text, "Label kelas"),
                       "summary": field(class_text, "Gambaran kelas"),
                       "mapSummary": field(class_text, "Peta belajar"),
                       "hubSummary": field(class_text, "Ringkasan katalog"),
                       "hero": {"src": hero_image.group(2), "alt": hero_image.group(1),
                                "caption": hero_credit.group(1), "credit": hero_credit.group(2),
                                "creditUrl": hero_credit.group(3)},
                       "finish": closing, "lessons": lessons})
    assert [len(course["lessons"]) for course in result] == [3, 4, 7]
    assert sum(len(lesson["sections"]) for course in result for lesson in course["lessons"]) == 96
    assert sum(bool(section["activity"]) for course in result for lesson in course["lessons"] for section in lesson["sections"]) == 20
    TARGET.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    compile_material()
