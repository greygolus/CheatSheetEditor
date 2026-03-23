const fs = require('fs');
const code = fs.readFileSync('exam-cheat-sheet-v2-SKILL.md', 'utf8');
const b64 = Buffer.from(code).toString('base64');
const content = `
// ===== AI SKILL EXPORT =====
const CHEAT_SHEET_SKILL_B64 = '${b64}';
function downloadSkill() {
  const text = atob(CHEAT_SHEET_SKILL_B64);
  const blob = new Blob([text], {type: 'text/markdown'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'exam-cheat-sheet-v2-SKILL.md';
  a.click();
}
`;
fs.appendFileSync('script.js', content, 'utf8');
console.log("Successfully appended downloadSkill to script.js");
