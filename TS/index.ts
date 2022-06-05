import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as queryString from 'query-string';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    let resposta = '';
    const urlParse = url.parse(req.url ?? '', true);
    const pathName = urlParse.pathname;

    const params = queryString.parse(urlParse.search ?? '');

    
  if(pathName == '/criar-atualizar-usuario'){
    fs.writeFile(`users/${params.id}.txt`, JSON.stringify(params),  function(err) {
      if (err) throw err;

      resposta = 'Usuario criado/atualizado com sucesso!';

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });

  } else if (pathName == '/selecionar-usuario') {
    fs.readFile(`users/${params.id}.txt`, function(err, data) {
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  } else if (pathName == '/remover-usuario') {
    fs.unlink(`users/${params.id}.txt`, function (err) {
      resposta = err ? 'Usuario nao encontrado':'Usuario removido com sucesso!';

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  } else {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Pagina nao encontrada!');
  }
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});