/**
 * The following code is a example create a web server using only native node API.
 * */
const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url);
  res.write('hello world!');
});

server.listen(8080, () => console.log('server start!'));

setTimeout(
  () =>
    http.get('http://127.0.0.1:8080/home', res => {
      res.on('data', data => console.log(data.toString()));
    }),
  200
);
