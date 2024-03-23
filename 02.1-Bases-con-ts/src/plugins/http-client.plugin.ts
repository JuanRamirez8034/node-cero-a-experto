import Axios from 'axios';

export const httpAxiosClientPlugin = {
  // metodo get
  get: async <T> (url:string):Promise<T> => {
    const resp = await Axios.get(url);
    return resp.data;
  },
  // metodo post
  post: async <T> (url:string, body:any):Promise<T> => {
    const resp = await Axios.post(url, body, { headers: { 'Content-Type': 'application/json' }});
    return resp.data;
  },
  // metodo put
  put: async <T> (url:string, body:any):Promise<T> => {
    const resp = await Axios.put(url, body, { headers: { 'Content-Type': 'application/json' }});
    return resp.data;
  },
  // metodo delete
  delete: async <T> (url:string, body:any):Promise<T> => {
    const resp = await Axios.delete(url, body);
    return resp.data;
  }
};

export const httpFechClientPlugin = {
  // metodo get
  get: async <T> (url:string):Promise<T> => {
    const resp = await fetch(url);
    return resp.json();
  },
  // metodo post
  post: async <T> (url:string, body:any):Promise<T> => {
    const resp = await fetch(url, {method:"POST",body, headers: {"content-type":"application/json"}});
    return resp.json();
  },
  // metodo put
  put: async <T> (url:string, body:any):Promise<T> => {
    const resp = await fetch(url, {method:"PUT",body, headers: {"content-type":"application/json"}});
    return resp.json();
  },
  // metodo delete
  delete: async <T> (url:string, body:any):Promise<T> => {
    const resp = await fetch(url, {method:"DELETE",body, headers: {"content-type":"application/json"}});
    return resp.json();
  }
};