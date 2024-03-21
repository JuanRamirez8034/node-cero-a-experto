const Axios = require('axios');

const httpAxiosClientPlugin = {
  // metodo get
  get: async (url) => {
    const resp = await Axios.get(url);
    return resp.data;
  },
  // metodo post
  post: async (url, body) => {
    const resp = await Axios.post(url, body, { headers: { 'Content-Type': 'application/json' }});
    return resp.data;
  },
  // metodo put
  put: async (url, body) => {
    const resp = await Axios.put(url, body, { headers: { 'Content-Type': 'application/json' }});
    return resp.data;
  },
  // metodo delete
  delete: async (url, body) => {
    const resp = await Axios.delete(url, body, { headers: { 'Content-Type': 'application/json' }});
    return resp.data;
  }
};

const httpFechClientPlugin = {
  // metodo get
  get: async (url) => {
    const resp = await fetch(url);
    return resp.json();
  },
  // metodo post
  post: async (url, body) => {
    const resp = await fetch(url, {method:"POST",body, headers: {"content-type":"application/json"}});
    return resp.json();
  },
  // metodo put
  put: async (url, body) => {
    const resp = await fetch(url, {method:"PUT",body, headers: {"content-type":"application/json"}});
    return resp.json();
  },
  // metodo delete
  delete: async (url, body) => {
    const resp = await fetch(url, {method:"DELETE",body, headers: {"content-type":"application/json"}});
    return resp.json();
  }
};

module.exports = {
  httpClient: httpFechClientPlugin,
  httpClientV2: httpAxiosClientPlugin
}