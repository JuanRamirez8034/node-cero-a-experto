const _getAge = require('get-age');

const getAge = (birthday) => {
  if(!birthday) throw Error('[-] Birthday is require');
  return _getAge(birthday);
}

module.exports = {
  getAge,
}