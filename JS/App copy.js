const http = require('http');
const url = require('url');
const queryString = require('query-string');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  const params = queryString.parse(url.parse(req.url, true).search)
  const pergunta = params.pergunta;
  let resposta;

  if(pergunta == 'melhor-filme') {
    resposta = 'Duna';
  } else if (pergunta == 'melhor-tech-backend') {
    resposta = 'nodejs';
  } else {
    resposta = 'nao sei, sorry!';
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});