require("process");
require("dotenv").config();

const config = {
    app: {
        devBaseUrl: process.env.DEV_BASE_URL,
        qaBaseUrl: process.env.QA_BASE_URL,
        uatBaseUrl: process.env.UAT_BASE_URL,
        stagingBaseUrl: process.env.STAGING_BASE_URL,
        prodBaseUrl: process.env.PROD_BASE_URL,
        baseUrl: process.env.BASE_URL || "http://localhost:8080", // default base url
        apiRoot: process.env.API_ROOT || "",
    },
    log: {
        level: process.env.LOG_LEVEL || "debug",
        logToFile: (process.env.LOG_TO_FILE === "true") || false,
    }
};

module.exports = config;