const fs = require('fs');

const data = fs.readFileSync('README.md', 'utf-8');

const fakeData = data.replace(/React/gi,'Angular-17');

fs.writeFileSync('README-fake.md', fakeData, 'utf-8');

console.log(fakeData);