import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { argumentsValues } from "./config/plugins";


// variables a usar
const { b:BASE, l:LIMIT, s:SHOW } = argumentsValues;


// estableciendo las rutas de directorios
const _dirPatch = path.join(__dirname, '../outputs');
const _filePatch = path.join(_dirPatch, `tabla-${BASE}.txt`);

// verificando que exista la carpeta, si no existe se crea
if(!existsSync(_dirPatch)) mkdirSync(_dirPatch, {recursive:true});

// escribiendo el encabezado
let dataFile = `
============================================
                Tabla del ${BASE}                 
============================================\n             
`;

// definiendo la informacion
for(let index = 1; index <= (LIMIT ?? 10); index++){
  const fragment = `${BASE} X ${index} = ${index * BASE}\n`;
  dataFile += fragment;
}
// mostrar por consola la informacion de la tabla
if(SHOW) {
  console.log(dataFile);
}

// creando el archivo
const writer = createWriteStream(`${_filePatch}`, {encoding:'utf-8'});
writer.write(dataFile);
writer.close();

console.log(`File created: '${_filePatch}'`);
