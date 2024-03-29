import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

// variables a usar
let base = 5;


// estableciendo las rutas de directorios
const _dirPatch = path.join(__dirname, '../outputs');
const _filePatch = path.join(_dirPatch, 'tabla-5.txt');

// verificando que exista la carpeta, si no existe se crea
if(!existsSync(_dirPatch)) mkdirSync(_dirPatch, {recursive:true});

// escribiendo el encabezado
let dataFile = `
============================================
                Tabla del ${base}                 
============================================\n             
`;

// definiendo la informacion
for(let index = 1; index<10; index++){
    const fragment = `${base} X ${index} = ${index * base}\n`;
    dataFile += fragment;
}
console.log(dataFile);

// creando el archivo
const writer = createWriteStream(`${_filePatch}`, {encoding:'utf-8'});
writer.write(dataFile);
writer.close();