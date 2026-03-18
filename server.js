const http = require('http');  // 👈 ARRIBA DEL TODO
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  // Mostrar HTML
  if (req.url === '/' && req.method === 'GET') {

    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500);
        return res.end('Error cargando el HTML');
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });

  }

  // Recibir formulario
  else if (req.url === '/login' && req.method === 'POST') {

    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {

      const params = new URLSearchParams(body);

      const username = params.get('username');
      const password = params.get('password');

      console.log('Usuario:', username);
      console.log('Password:', password);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Datos recibidos');

    });

  }

  else {
    res.writeHead(404);
    res.end('No encontrado');
  }

});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});