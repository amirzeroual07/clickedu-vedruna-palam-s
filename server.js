const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  // Mostrar HTML
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('index.html', (err, data) => {
  if (err) {
    console.log(err); // 👈 MUY IMPORTANTE
    res.writeHead(500);
    return res.end('Error cargando el HTML');
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('FUNCIONA');
});
  }

  // Recibir formulario
  if (req.url === '/login' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      console.log('Datos en bruto:', body);

      const params = new URLSearchParams(body);

      const username = params.get('username');
      const password = params.get('password');

      console.log('Usuario:', username);
      console.log('Password:', password);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Datos recibidos');
    });
  }

});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});