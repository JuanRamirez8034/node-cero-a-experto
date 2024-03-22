const { getAge } = require('./get-age.plugin');
const { generateId } = require('./uid.plugin');
const { httpClient, httpClientV2 } = require('./http-client.plugin');
const buildLogger = require('./logger.plugin');

module.exports = {
  getAge,
  generateId,
  httpClient,
  httpClientV2,
  buildLogger,
}