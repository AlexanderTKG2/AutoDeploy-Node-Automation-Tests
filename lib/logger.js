const winston = require("winston");
const config = require("../config");

const log = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf((info) => {
          const { level, message, timestamp, ...meta } = info;
          const metaString =
            Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
          return `${timestamp} [${level}]: ${message}${metaString}`;
        }),
      ),
    }),
  ],
  level: config.log.level,
  colorize: true,
  timestamp: true,
});

module.exports = {
  log,
};
