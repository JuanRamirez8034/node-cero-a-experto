const fs = require('fs');

const file = fs.readFileSync('README.md','utf-8');

const totalWords = file.split(' ').length;

console.log(`Total de palabras: ${totalWords}`);

const WordsRegex = file.split(/\s/);

console.log(`Total de palabras con regex: ${WordsRegex.length}`);

const WordsReact = file.split(/React/ig);

console.log(`Total de palabras "React" con regex: ${WordsReact.length}`);
