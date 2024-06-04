import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req:http.IncomingMessage, res:http.ServerResponse) => {
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