const { getAge } = require('./get-age.plugin');
const { generateId } = require('./uid.plugin');
const { httpClient, httpClientV2 } = require('./http-client.plugin');

module.exports = {
  getAge,
  generateId,
  httpClient,
  httpClientV2,
}