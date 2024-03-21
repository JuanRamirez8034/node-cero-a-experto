// const { generateId } = require('../plugins/uid.plugin');
// const { getAge } = require('../plugins/get-age.plugin');

// ********************************************************************************
// patron adaptador
// const { generateId, getAge } = require('../plugins');

// const personData = {
//   name: 'Juan',
//   birthday: '2001-03-16'
// };

// const buildPerson = ({name, birthday}) => {
//   return {
//     id: generateId(),
//     name,
//     age: getAge(birthday)
//   }
// };

// const newPerson = buildPerson(personData);


// console.log(newPerson);

// *********************************************************************************
// facory functions
const makeBuildPerson = ({generateId, getAge}) => {
  
  return ({name, birthday}) => {
    return {
      id: generateId(),
      name,
      age: getAge(birthday)
    }
  }
};

module.exports = {
  makeBuildPerson
}