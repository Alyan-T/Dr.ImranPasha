import re
with open(r'C:\Users\Alyan Tariq\.gemini\antigravity\brain\3e9b93a6-93bf-4dcd-97f9-212d1da04cc2\.system_generated\steps\225\content.md', encoding='utf-8') as f:
    html = f.read()
tds = re.findall(r'<td class="gsc_rsb_std">(\d+)</td>', html)
print('Metrics:', tds)
