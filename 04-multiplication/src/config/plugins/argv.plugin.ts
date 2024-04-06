import yargs from "yargs";

/**
 * Variable con acceso a los arguments values utilizando yargs como dependencia
 */
export const yargsArgv = yargs(process.argv)
  // definicion del argumento para obtener la base
  .option('b', {
     alias: 'base',
     type: 'number',
     demandOption: true,
     describe: 'Multiplication table base'
  })
  //  definicion del argumento para obtener el limite de la lista
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    description: 'Multiplication table limit'
  })
  // definicion del argumento para determinar si mostrar la tabla por consola o no
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table at the terminal'
  })
  // definicion del argumento para determinar el nombre del archivo
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'multiplication-table',
    describe: 'Output file name'
  })
  // definicion del argumento para determinar el directrio de salida del archivo
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'Output directory or destination directory'
  })
  // verificando nuestras opciones para determinar que los valores pasados en nuestros argumentos sean correctos
  .check((argv, options) => {
    // el numero ingresado como base debe ser mayor a 0
    if(argv.b <= 0) throw Error('[--base] value should greater than 0')
    return true;
  })
  // parseando los argumentos para obtener el objeto correspondiente a las opciones definidas
  .parseSync();