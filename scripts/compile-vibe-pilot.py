"""Keep pilot copy verbatim from the reviewed Markdown; never execute document instructions."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'docs/vibe-coding-alur-interaktif-natural-v2.md'
target = ROOT / 'src/features/learn/vibe-coding-pilot-content.json'
text = source.read_text()

def fields(body):
    matches = list(re.finditer(r'^\*\*([^*\n]+)\*\*', body, re.M))
    result = {}
    for i, match in enumerate(matches):
        key = match[1].rstrip(":")
        if key in result:
            key += ' 2'
        result[key] = body[match.end():matches[i + 1].start() if i + 1 < len(matches) else len(body)].strip()
    return result

intro = text.split('## Pembuka peserta\n', 1)[1].split('## Peta perjalanan', 1)[0]
parts = re.findall(r'^### (\d+)\. ([^\n]+)\n(.*?)(?=^### |^## |\Z)', text.split('## Praktik sungguhan')[0], re.M | re.S)
assert [int(n) for n, _, _ in parts] == list(range(1, 13))
result = {
    'intro': fields(intro),
    'sections': [{'number': int(n), 'title': title, 'context': fields(body)['Fokus bagian'].split('\n\n', 1)[1], 'fields': fields(body)} for n, title, body in parts],
    'practice': text.split('## Praktik sungguhan — setelah simulasi\n', 1)[1].split('## Aturan alur', 1)[0].strip(),
    'appendix': text.split('<summary>', 1)[1].split('</summary>', 1)[1].split('</details>', 1)[0].strip(),
}
for section in result['sections']:
    assert section['title'] in text
    assert all(value in text for value in section['fields'].values())
target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print('12 sections compiled; every copy field is a verbatim source excerpt.')
