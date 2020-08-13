let winston = require('winston');

function getLogger() {
    return winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    });
}

module.exports = getLogger;