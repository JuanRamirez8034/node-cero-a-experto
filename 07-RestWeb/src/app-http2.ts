import http2, { Http2ServerRequest, Http2ServerResponse } from 'http2';
import fs from 'fs';
import path from 'path';

// lectura recomendada: https://web.dev/articles/performance-http2?hl=es-419

let key: string = '';
let cert: string = '';

try {
  key = fs.readFileSync(path.join(__dirname, '../keys/server.key'), {encoding: 'utf-8'});
  cert = fs.readFileSync(path.join(__dirname, '../keys/server.crt'), {encoding: 'utf-8'});
} catch (error) {
  console.log(`'Error al cargar los certificados de OPENSSL, lea como obtenerlos en el archivo: ${path.join(__dirname, '../readme.md')}`, error);  
}

const server = http2.createSecureServer({ cert, key },(req:Http2ServerRequest, res:Http2ServerResponse) => {
  try {
    console.log(req.url);
    if(req.url === '/'){
      res.writeHead(200, {"Content-Type": "text/html"});
      const fileText = fs.readFileSync(path.join(__dirname, '../public/index.html'), {encoding: 'utf-8'});
      res.end(fileText);
      return;
    }
  
    const fileText = fs.readFileSync(path.join(__dirname, `../public${req.url}`), {encoding: 'utf-8'});    

    const resolverContentType = (req.url && req.url.endsWith('.js'))
      ? "text/javascript" 
      : (req.url && req.url.endsWith('.css'))
        ? "text/css" 
        : "text/plain-text";
        console.log(resolverContentType);

    res.writeHead(200, {"Content-Type": resolverContentType});
    res.end(fileText);
  } catch (error) {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end();
  }
});

server.listen(3000, () =>{
  console.log('server on port 3000');
  
});