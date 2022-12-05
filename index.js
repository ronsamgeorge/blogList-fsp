const config = require("./utils/config");
const logger = require("./utils/logger")
const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const PORT = config.port || 8080;

server.listen(PORT, () => {
    logger.info(`Listening on port : ${PORT}`);
})