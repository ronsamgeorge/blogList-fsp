const logger = require('./logger');

const unknownEndpoint = (req, res) => {
   res.status(404).send({error : 'Unknown Endpoint'})
};

const errorHandler = (error, res, req, next) => {
    logger.error(error.message);
    next(error);
}

module.exports = {
    unknownEndpoint,
    errorHandler
}