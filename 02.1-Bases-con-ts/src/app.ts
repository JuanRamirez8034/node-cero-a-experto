// ********************************************
// const {template} = require('./js-foundation/01-template');
// console.log(template);



// ********************************************
// require('./js-foundation/02-destructuring');



// ********************************************
// const { getUserById } = require('./js-foundation/03-callbacks');
// const userId = 2;
// getUserById(userId, function(error, user){
//   if(error){
//     throw new Error(error);
//   }
//   console.table(user)
// });



// ********************************************
// const { getUserById } = require('./js-foundation/04-arrow');
// const userId = 1;
// getUserById(userId, function(error, user){
//   if(error) throw new Error(error);
//   console.table(user)
// });



// ********************************************
// patron adaptador
// require('./js-foundation/05-factory');



// ********************************************
// factory functions aplicado
// const { makeBuildPerson } = require('./js-foundation/05-factory');
// const { generateId, getAge } = require('./plugins')

// const buildPerson = makeBuildPerson({generateId, getAge});
// const newPerson = buildPerson({ name: 'Juan', birthday: '2001-03-16' });
// console.table(newPerson);



// ********************************************
// Promesas
// const getPokemonById = require('./js-foundation/06-promises');

// getPokemonById(1, (error, pokemon)=>{
//   if(error) throw Error(`[Error] ${error}`);
//   console.log(pokemon);
// })



// ********************************************
// Promesas en cadena
// const getPokemonById = require('./js-foundation/06.1-promises');

// getPokemonById(1)
//  .then(pokemon => console.log({pokemon}))
//  .catch(error => console.error(`[Promise error] ${error}`))
//  .finally(_finally => console.log('[Promise] Success'));



// ********************************************
// Promesas en cadena
// const getPokemonById = require('./js-foundation/06.2-promises-async-await');

// getPokemonById(1)
//  .then(pokemon => console.log({pokemon}))
//  .catch(error => console.error(`[Promise error] ${error}`))
//  .finally(_finally => console.log('[Promise] Success'))



// ********************************************
// implementacion de un logger
import { buildLogger } from './plugins';
const logger = buildLogger('app.js');
logger.log('Probando el logger de winston con la adaptacion');
logger.error('Probando el logger de winston con la adaptacion y un error');
