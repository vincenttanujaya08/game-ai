# NUSA Lab: UX & evidence for a low-overwhelm AI-literacy landing page

_Research date: 12 September 2026. Sources are primary/authoritative publications; numbers below must retain their scope and date in public copy._

## Recommendation in one sentence

Make the landing page feel like an editorial **invitation to test a claim**, not a course catalogue: one strong idea, one primary action, one sourced fact, then the detail only when someone asks for it.

That is a better fit for NUSA Lab than a long promise list or a grid of many learning cards. It makes the product’s point of view clear: AI literacy is judgement, not simply tool use.

## What good UX should mean here

| Principle | Design decision for NUSA Lab | Why this is defensible |
| --- | --- | --- |
| Start with the essential | Hero contains one message, one short supporting sentence, and one primary CTA. Navigation has only `Jelajahi` and `Tentang`. | NN/g recommends showing only the most important options first and placing specialised detail behind an obvious next step; this reduces unnecessary complexity for both new and experienced users. [NN/g](https://www.nngroup.com/articles/progressive-disclosure/) |
| Let space do real work | Use a very large headline, a single visual “evidence object”, and deliberate blank space. Keep body copy in short blocks; do not put 3–5 cards inside the hero. | W3C’s cognitive-accessibility guidance recommends short sentences/blocks, whitespace, and clear foreground-background separation to aid comprehension. [W3C WAI](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/) |
| Show evidence, not decoration | The hero visual can be a large typographic number, source card, or verification stamp—not a generated robot/person illustration. Each statistic must carry a visible source/year link. | This directly demonstrates the behaviour NUSA teaches: notice scope, check the source, then decide what it means. It also keeps the page visually distinctive without relying on AI-generated assets. |
| Give each scroll a job | Order sections as: **invitation → one proof point → how the Lab works → one real scenario → deeper information**. Never repeat the same claim in three styles. | Progressive disclosure is explicitly suitable for information-rich websites and mobile: high-level pages introduce the concept; lower levels carry detail. [NN/g](https://www.nngroup.com/articles/progressive-disclosure/) |
| Make the page scannable and inclusive | Use real `h1`–`h3` hierarchy, concise descriptive headings, and meaningful CTAs such as `Uji jawaban pertama`, not `Klik di sini`. | W3C advises short headings that communicate structure and meaningful link text; semantic headings also support screen-reader navigation. [W3C WAI](https://www.w3.org/WAI/tips/writing/) |

### Visual direction: modern but still NUSA

- Keep the existing navy, coral, mint, sky, and yellow palette—but use it as **bold editorial blocks**, not as a rainbow of small cards.
- Use one intentionally oversized typographic element per section. The rest should be quiet: strong grid, one sans-serif family, sharp borders, no glass panels, gradients, character illustrations, or sticker overload.
- Treat a citation as part of the design: `OECD PISA 2025 ↗` can sit below a large `46%`, with a one-line explanation. A source link is both visual texture and proof.
- Use only one motion idea, if any: a source card flips from `Jawaban AI` to `Sumber diperiksa`. It must respect `prefers-reduced-motion` and never be needed to understand the page.

## Proposed landing-page content

### Above the fold

> **Jangan biarkan AI berpikir untukmu.**
>
> NUSA Lab membantumu bertanya lebih baik, memeriksa jawaban, dan memutuskan kapan AI memang membantu.
>
> **CTA:** `Uji jawaban pertama`

No audience label is necessary. The language describes a useful behaviour, so it stays inclusive without saying “untuk SMA dan kuliah”.

### Evidence section (one big fact, not a dashboard)

> **46%**
>
> Pelajar di negara-negara OECD mengatakan memakai chatbot untuk belajar setidaknya setiap minggu.
>
> _PISA 2025 · rata-rata OECD, bukan angka Indonesia_ — [lihat sumber](https://www.oecd.org/en/publications/pisa-2025-results-volume-i_73451bc5-en.html)

Follow it with one interpretation, not a fear claim:

> AI sudah masuk ke kebiasaan belajar. Yang perlu dilatih bukan sekadar cara memakainya, tetapi cara menilainya.

This is supported by the use statistic. Do **not** say that chatbot use causes better or worse grades: PISA reports associations that vary by task and context, not experimental causation.

### What NUSA teaches (three verbs, not a long curriculum list)

1. **Tanya** — pecah masalah dan beri AI konteks yang cukup.
2. **Cek** — telusuri sumber, bias, dan bagian yang belum pasti.
3. **Putuskan** — pakai, ubah, atau tolak jawabannya dengan alasanmu sendiri.

This deliberately echoes UNESCO’s student framework: human-centred mindset, ethics, AI techniques/applications, and AI system design; its progression is understand, apply, create. [UNESCO, 2024](https://www.unesco.org/en/articles/ai-competency-framework-students)

### Featured scenario

> **SITASI BERMASALAH**
>
> Sebuah jawaban AI terlihat rapi. Tapi apakah sumbernya benar-benar ada?
>
> `Buka kasus →`

Use the existing mission as the proof of experience. It is more credible than claiming broad outcomes that have not yet been measured.

### Optional credibility footer

> AI literacy is not “lebih jago memberi prompt”. UNESCO separates AI competence into 12 competencies across four dimensions, including human-centred thinking and ethics. [UNESCO, 2024](https://www.unesco.org/en/articles/ai-competency-framework-students)

This keeps the claim specific and sourceable without pretending NUSA is officially accredited or endorsed by UNESCO.

## Evidence bank: what can be said honestly

| Claim | Source and scope | Safe landing-page use |
| --- | --- | --- |
| **46%** of students across OECD countries use AI chatbots weekly or more to help them learn. | OECD PISA 2025 results. This is an OECD average, not Indonesia-specific; it is self-reported usage. [OECD](https://www.oecd.org/en/publications/pisa-2025-results-volume-i_73451bc5-en.html) | Use as the hero proof point only with `OECD` and `2025` in the visible source label. |
| UNICEF estimates at least **20 million** children in 10 surveyed countries have used AI; about **13 million** said they use it for learning/homework. | UNICEF analysis published June 2026, modelled from nationally representative household surveys of internet-using 12–17-year-olds and parents/caregivers in 10 countries. It is neither a world total nor an Indonesia figure. [UNICEF](https://www.unicef.org/press-releases/children-are-adopting-ai-technologies-more-three-times-faster-adults) | A strong optional proof point: “Dipakai untuk belajar—dan untuk mengambil keputusan. Karena itu, literasi AI bukan tambahan.” Keep the source and scope a tap away. |
| Fewer than **10%** of more than 450 schools and universities surveyed had institutional policies/formal guidance on generative AI. | UNESCO survey conducted 4–19 May 2023 through UNESCO-associated-school and university-chair networks; not a current census of all institutions. [UNESCO](https://www.unesco.org/en/articles/unesco-survey-less-10-schools-and-universities-have-formal-guidance-ai) | Use in an “Why this Lab exists” detail section with the year. Do not write “only 10% of schools today”. |
| UNESCO’s 2024 student framework specifies **12 competencies** in **four dimensions**: human-centred mindset, ethics, AI techniques/applications, and AI system design. | UNESCO global guidance; it is a framework, not evidence that a particular course improves outcomes. [UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-students) | Use to explain why NUSA covers judgement, ethics, and verification—not just prompting. |
| Indonesia’s national curriculum information site lists **Koding dan Kecerdasan Artifisial** as a subject that schools may offer and learners may choose according to interest and available resources. | Indonesia Ministry of Primary and Secondary Education, curriculum update for Permendikdasmen No. 13/2025. [Kurikulum Kemendikdasmen](https://kurikulum.kemendikdasmen.go.id/) | Use in an Indonesia-focused `Tentang`/context section: “Literasi AI sudah menjadi bagian dari percakapan pendidikan Indonesia.” Avoid claiming every school teaches it. |
| In PISA 2025, fewer than half (**46%**) of students across OECD countries reported both checking source credibility and trusting scientific evidence over common sense. | OECD PISA 2025; self-report, OECD-wide, and broader than AI use. [OECD](https://www.oecd.org/en/publications/pisa-2025-results-volume-i_73451bc5-en.html) | Good alternative proof point for a source-verification mission. Label it precisely; do not frame it as an Indonesia statistic. |

## Claims to avoid

- “AI will replace jobs, so you must learn this now.” This is alarmist and not needed to explain the product.
- “AI literacy guarantees better grades/career outcomes.” NUSA has not measured this; the cited PISA results are observational associations, not proof of a benefit.
- “Used by X students” or “trusted by schools” until NUSA has verifiable product data and permission to name partners.
- “According to UNESCO” beside general design rhetoric. Use UNESCO only for the specific framework or 2023 survey above.

## Stronger proof point: usage is already widespread; evaluation needs teaching

### Recommended landing treatment

> **86%**
>
> Pelajar OECD sudah memakai AI untuk tugas sekolah.
>
> **62%** belajar menilai informasi yang dibuat AI.
>
> AI membuka cara baru untuk belajar. Literasi AI membantu kita bertanya dengan tujuan, memeriksa hasilnya, lalu memakainya dengan pemahaman.
>
> _OECD PISA 2025 · rata-rata OECD_ — [lihat data](https://gpseducation.oecd.org/IndicatorExplorer?plotter=h5&query=64)

This is the strongest replacement for the isolated `46%` figure because the two numbers form one evidence object with a clear, constructive point: AI is already part of schoolwork, and learning how to evaluate its output is a complementary skill—not a warning to avoid AI.

### What the figures mean—and what they do not

- **86%** is the complement of the **14%** of students who said they did not use AI for schoolwork in 2025. It covers the four PISA schoolwork activities: helping them learn, preliminary research, drafting text, and summarising reading.
- **62%** reported learning to assess AI-generated information. It is not a measure of whether they can assess it well, nor proof that instruction causes better results.
- Both are **self-reported OECD averages** from PISA 2025; they are not Indonesia-specific and describe 15-year-old students. Keep `OECD PISA 2025` visible with the figures, and do not turn them into a claim about NUSA’s impact.

The underlying PISA report finds associations—not causation—between AI-use patterns, learning opportunities, and science performance. It supports the need for purposeful, guided use, but not a promise that any AI-literacy programme will raise grades. [OECD PISA 2025 full report](https://www.oecd.org/en/publications/pisa-2025-results-volume-i_73451bc5-en/full-report/student-school-life-and-beyond_861e5904.html)

## Alternative proof point: AI is already part of how young people learn

Use this in place of the PISA `86% / 62%` block. It supports the word `remaja`, uses a large school-based sample, and gives the landing one clear reason to exist without treating AI as an enemy.

### Exact landing copy

> **2 dari 3**
>
> anak dan remaja pengguna ChatGPT memakainya untuk keperluan sekolah.
>
> **AI sudah menjadi bagian dari cara belajar.**
>
> NUSA Lab melatih cara memakainya dengan tujuan, memeriksa hasilnya, dan membangun kesimpulan sendiri.
>
> _UNICEF & UNESCO · Kids Online Argentina 2025 · 5.910 siswa usia 9–17_ — [lihat laporan](https://www.unicef.org/argentina/media/24881/file/ResumenEjecutivoKidsOnline2025.pdf)

If the two-number composition from the mock-up must be retained exactly, use:

> **58%** pernah memakai ChatGPT.
>
> **66%** dari penggunanya memakai ChatGPT untuk keperluan sekolah.

Do not present `58%` and `66%` as if they share the same denominator. The second figure is a subset of respondents who had used ChatGPT.

Short source label:

> `UNICEF & UNESCO · Argentina, 2025 · 5.910 siswa ↗`

### Why this is the best replacement

- It answers a direct product question: AI is not merely popular; it is already being used for schoolwork. NUSA therefore teaches how to make that existing use purposeful, informed, and accountable.
- The source itself says responsible, safe, and effective digital skills are taught and learned through intentional action and support, alongside comprehension, critical thinking, self-regulation, and autonomy.
- The wording does not imply that using ChatGPT for school is inherently good or bad. It establishes context, then states the capability NUSA intends to build.
- `Anak dan remaja` accurately matches the surveyed population. Do not shorten it to `remaja di seluruh dunia` or `pelajar Indonesia`.

### Scope and caveats

- UNICEF Argentina and UNESCO Montevideo surveyed 5,910 students aged 9–17 across 291 public and private primary and secondary schools in 20 jurisdictions. Fieldwork ran from October to December 2024; publication was May 2025.
- The sample was designed to be nationally representative by age group, gender, and socioeconomic level for students in Argentinian urban localities with at least 50,000 residents. It is not an Indonesia or global estimate.
- `58%` reported ever using ChatGPT. `66%` is the report's `two out of three` among ChatGPT users who used it for school-related purposes.
- The study measures reported behaviour, not the quality of AI use, AI-literacy competence, or learning outcomes. Do not claim that the figures prove NUSA improves grades.
- The statistic names ChatGPT because that is what the survey measured. Do not silently broaden it to every AI system.

Primary sources: UNICEF Argentina and UNESCO Montevideo, [*Kids Online Argentina 2025: Executive Summary*](https://www.unicef.org/argentina/media/24881/file/ResumenEjecutivoKidsOnline2025.pdf), pp. 2 and 4; [methodological document](https://www.unicef.org/argentina/media/28051/file/Documento%20metodol%C3%B3gico.%20Tablero%20de%20Indicadores.%20Encuesta%20Kids%20Online%20ARG%202025.pdf).

## September 2026 replacement audit: remove the awkward subset statistic

The `2 dari 3` Argentina statement is accurate, but it is poor landing-page copy: its denominator is only young people who had already used ChatGPT. A visitor has to decode the subset before understanding the point. Replace it with a statistic whose denominator is **all surveyed teens**.

### Recommended: one direct usage figure

> **7 dari 10**
>
> remaja di AS sudah memakai AI untuk tugas sekolah.
>
> **AI sudah menjadi bagian dari cara belajar.**
>
> NUSA Lab membantumu memakai AI dengan tujuan, memeriksa hasilnya, dan tetap membangun pemahamanmu sendiri.
>
> _Common Sense Media · AS, 2026 · 1.017 remaja_ — [lihat laporan](https://www.commonsensemedia.org/sites/default/files/research/report/commonsensemedia_teensaischoolworkskills_2026.pdf)

Why this is the best landing option:

- The denominator is simple: **70% of the full nationally representative sample**, not 70% of AI users.
- It directly establishes the product context—AI is already used for schoolwork—without calling that use good, bad, or dangerous.
- The source is recent and transparent: Common Sense Media commissioned NORC at the University of Chicago to survey 1,017 U.S. teenagers ages 13–17 across all 50 states and Washington, D.C., from 30 April to 14 May 2026.
- The same report found that 66% of teen AI users agreed it helps them understand schoolwork, not only finish it faster. That supports NUSA's constructive framing, but should remain supporting copy rather than becoming a second oversized statistic.

Caveats: `AI` is broader than ChatGPT or chatbots, and `tugas sekolah` is more precise than the broader word `belajar`. The result represents U.S. teens ages 13–17, not Indonesian or global teens, so `di AS` must stay in the visible sentence or source line. It is self-reported use, not evidence that AI improves learning.

### Candidate 2: strongest survey brand, more conservative number

> **54%**
>
> remaja di AS pernah memakai chatbot AI untuk membantu tugas sekolah.
>
> _Pew Research Center · AS, 2026 · 1.458 remaja_ — [lihat laporan](https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/)

Pew surveyed 1,458 U.S. teens ages 13–17 from 25 September to 9 October 2025 using Ipsos KnowledgePanel, a nationally representative probability-based panel. Margin of sampling error was ±3.3 percentage points. This is the most methodologically conservative choice and precisely names `chatbot AI`, but `54%` has less visual force than `7 dari 10` and makes a weaker first impression.

Caveats: U.S.-only, self-reported, and specific to chatbot use. `Pernah memakai` must not be changed to `rutin memakai`.

### Candidate 3: directly validates the need for AI-literacy education

> **52%**
>
> pelajar SMP dan SMA di AS menilai sekolah perlu mengajarkan cara memanfaatkan AI.
>
> _Gallup · AS, 2025 · 1.460 pelajar K–12_ — [lihat laporan](https://www.gallup.com/file/analytics/658901/Gallup-Walton-Family-Foundation_Voices-of-Gen-Z_How-American-Youth-View-AI-Report.pdf)

Gallup's probability-based panel surveyed 3,465 U.S. Gen Z respondents ages 13–28 from 6–13 March 2025; the relevant school subgroup contained 1,460 respondents ages 13–18 still enrolled in K–12, with a ±3.3-point margin of error. This figure explains **why instruction is wanted**, so it fits an about/credibility section better than the main usage proof.

Caveats: the original response says schools `should be required` to help students understand how to leverage AI. The Indonesian wording above captures perceived need; do not paraphrase it as proof that schools currently lack instruction or that Indonesian students want the same thing.

### Indonesia/global-source check

No recent, nationally representative Indonesian primary-source survey was found that measures teenage AI use for learning with a clearly published sample and denominator. The closest UNICEF Indonesia materials concern broader digital learning or online safety, not current AI-for-schoolwork use. A clearly labelled U.S. statistic is more defensible than presenting a small, commercial, or non-representative study as an Indonesian fact.

UNICEF's 2026 cross-country study is authoritative and covers roughly 1,000 internet-using children ages 12–17 in each of 10 countries, but its `13 million children use AI for learning/homework` figure is modelled across those countries rather than a global prevalence rate. It is useful in a research note, not as clean landing copy. [UNICEF Innocenti](https://www.unicef.org/innocenti/documents/snapshot-ai-usage-among-children-parents)

## Source list

1. W3C Web Accessibility Initiative, [Use Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/).
2. Nielsen Norman Group, [Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/).
3. W3C Web Accessibility Initiative, [Writing for Web Accessibility](https://www.w3.org/WAI/tips/writing/).
4. UNESCO, [AI competency framework for students](https://www.unesco.org/en/articles/ai-competency-framework-students), 2024.
5. UNESCO, [Global survey: fewer than 10% of schools and universities had formal guidance on AI](https://www.unesco.org/en/articles/unesco-survey-less-10-schools-and-universities-have-formal-guidance-ai), survey conducted May 2023.
6. OECD, [PISA 2025 Results, Volume I](https://www.oecd.org/en/publications/pisa-2025-results-volume-i_73451bc5-en.html).
7. UNICEF, [Children are adopting AI technologies more than three times faster than adults](https://www.unicef.org/press-releases/children-are-adopting-ai-technologies-more-three-times-faster-adults), 2026.
8. Kementerian Pendidikan Dasar dan Menengah RI, [Sistem Informasi Kurikulum Nasional](https://kurikulum.kemendikdasmen.go.id/), curriculum update for Permendikdasmen No. 13/2025.
9. OECD Education GPS, [Artificial intelligence in education](https://gpseducation.oecd.org/IndicatorExplorer?plotter=h5&query=64), PISA 2025 indicators.
10. UNICEF Argentina and UNESCO Montevideo, [*Kids Online Argentina 2025: Executive Summary*](https://www.unicef.org/argentina/media/24881/file/ResumenEjecutivoKidsOnline2025.pdf), 2025.
11. Common Sense Media, [*Teens in the AI Era: Schoolwork and Skills That Matter*](https://www.commonsensemedia.org/sites/default/files/research/report/commonsensemedia_teensaischoolworkskills_2026.pdf), nationally representative U.S. survey conducted by NORC, 2026.
12. Pew Research Center, [*How Teens Use and View AI*](https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/), nationally representative U.S. survey, 2026.
13. Gallup, Walton Family Foundation, and GSV Ventures, [*Voices of Gen Z: How American Youth View and Use Artificial Intelligence*](https://www.gallup.com/file/analytics/658901/Gallup-Walton-Family-Foundation_Voices-of-Gen-Z_How-American-Youth-View-AI-Report.pdf), 2025.
14. UNICEF Innocenti, [*Snapshot of AI Usage and Concerns Among Children and Parents*](https://www.unicef.org/innocenti/documents/snapshot-ai-usage-among-children-parents), 2026.
