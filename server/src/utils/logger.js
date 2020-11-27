let winston = require('winston');

function getLogger() {
    return winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'server_combined.log' }),
            new winston.transports.File({ filename: 'server_error.log', level: 'error' })
        ]
    });
}

module.exports = getLogger;