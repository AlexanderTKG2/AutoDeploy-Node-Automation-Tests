const winston = require("winston");
const config = require("../config");

function getTransportsArray(logToFile) {
  const transports = [
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
  ];

  if (logToFile) {
    transports.push(
      new winston.transports.File({
        filename: "automation-tests.log",
        level: "info",
        format: require("winston").format.combine(
          require("winston").format.timestamp(),
          require("winston").format.json(),
        ),
      }),
    );
  }
  return transports;
}

const log = winston.createLogger({
  transports: getTransportsArray(config.log.logToFile),
  level: config.log.level,
  colorize: true,
  timestamp: true,
});

module.exports = {
  log,
};
