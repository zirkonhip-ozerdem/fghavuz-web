// cPanel/Passenger startup file: serves the production build like `next start`.
const http = require("node:http");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({dev: false, dir: __dirname});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`FGPOOL web ready on port ${port}`);
  });
});
