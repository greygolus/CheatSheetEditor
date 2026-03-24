const fs = require('fs');

const b64 = fs.readFileSync('study-guide-SKILL.md', 'utf8').trim();
const b64String = Buffer.from(b64).toString('base64');

const newFunc = `\nconst STUDY_GUIDE_SKILL_B64 = '${b64String}';
function downloadStudyGuideSkill() {
  const text = atob(STUDY_GUIDE_SKILL_B64);
  const blob = new Blob([text], {type: 'text/markdown'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'study-guide-SKILL.md';
  a.click();
}\n`;

fs.appendFileSync('script.js', newFunc);
console.log('Successfully appended downloadStudyGuideSkill to script.js');
