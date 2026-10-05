import { z } from "zod";

export const eventId = "vibe-coding-challenge";

const text = (max: number) => z.string().trim().min(2).max(max);
const link = z.string().trim().max(500).url().refine((value) => URL.canParse(value) && new URL(value).protocol === "https:");

export const registrationSchema = z.object({ name: text(100), university: text(150) });
export const feedbackSchema = z.object({
  teachingRating: z.coerce.number().int().min(1).max(5),
  practiceRating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().max(500),
});
export const submissionSchema = z.object({
  projectName: text(120), summary: text(600),
  repositoryUrl: link.refine((value) => {
    if (!URL.canParse(value)) return false;
    const url = new URL(value);
    return url.hostname === "github.com" && url.pathname.split("/").filter(Boolean).length >= 2;
  }),
  demoUrl: link, aiTools: text(500),
});
