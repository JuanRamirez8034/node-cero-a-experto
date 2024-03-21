const { v4 : _uidV4 } = require('uuid');

const generateId = () => _uidV4();

module.exports = {
  generateId,
}