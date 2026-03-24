const fs = require('fs');

const jsonPath = 'P123_E2_CheatSheet_Project.json';
const scriptPath = 'script.js';

const jsonData = fs.readFileSync(jsonPath, 'utf8');
let scriptJs = fs.readFileSync(scriptPath, 'utf8');

const regex = /function initSections\(\) \{[\s\S]*?\n\s*renderAll\(\);\n\}/;
const newContent = `function initSections() {
  const data = ${jsonData};
  loadStateObj(data);
  renderAll();
}`;

let newScript = scriptJs.replace(regex, newContent);

if (newScript === scriptJs) {
  console.log('Regex did not match!');
} else {
  fs.writeFileSync(scriptPath, newScript, 'utf8');
  console.log('Successfully updated initSections');
}
