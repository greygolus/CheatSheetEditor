const fs = require('fs');
const path = require('path');

const b64 = fs.readFileSync('exam-cheat-sheet-v2-SKILL.md', 'utf8').trim();
const b64String = Buffer.from(b64).toString('base64');

let scriptJs = fs.readFileSync('script.js', 'utf8');

// Replace everything after const CHEAT_SHEET_SKILL_B64 = '...' 
scriptJs = scriptJs.replace(/const CHEAT_SHEET_SKILL_B64 = '[^']+';/, `const CHEAT_SHEET_SKILL_B64 = '${b64String}';`);

fs.writeFileSync('script.js', scriptJs, 'utf8');
console.log('Successfully updated script.js');
