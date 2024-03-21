
const { OS, npm_package_name, NODE } = process.env;

// console.table({ OS, npm_package_name, NODE })


const namesArr = ['name 1', 'name 2', 'name 3'];

const [,,p3] = namesArr;

// console.log('Destructurado->', p3);