const fs = require('fs');

const stemB64 = Buffer.from(fs.readFileSync('cheat-sheet-stem-SKILL.md', 'utf8').trim()).toString('base64');
const genB64 = Buffer.from(fs.readFileSync('cheat-sheet-SKILL.md', 'utf8').trim()).toString('base64');

let scriptJs = fs.readFileSync('script.js', 'utf8');

const marker = "// ===== AI SKILL EXPORT =====";
const idx = scriptJs.indexOf(marker);
if (idx !== -1) {
    scriptJs = scriptJs.substring(0, idx);
}

const newBlock = `${marker}
const CHEAT_SHEET_SKILL_B64 = '${stemB64}';
function downloadSkill() {
  const text = atob(CHEAT_SHEET_SKILL_B64);
  const blob = new Blob([text], {type: 'text/markdown'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cheat-sheet-stem-SKILL.md';
  a.click();
}

const STUDY_GUIDE_SKILL_B64 = '${genB64}';
function downloadStudyGuideSkill() {
  const text = atob(STUDY_GUIDE_SKILL_B64);
  const blob = new Blob([text], {type: 'text/markdown'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cheat-sheet-SKILL.md';
  a.click();
}
`;

fs.writeFileSync('script.js', scriptJs + newBlock);
console.log('Successfully updated script.js');
