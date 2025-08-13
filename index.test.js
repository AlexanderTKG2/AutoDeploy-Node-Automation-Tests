const {
  employeeSuccessCasesIntegrationTestSuite,
} = require("./integration/employee/successCases.integration.test");
const {
  employeeErrorCasesIntegrationTestSuite,
} = require("./integration/employee/errorCases.integration.test");
const config = require("./config");
const HttpService = require("./services/httpService");
const { parseStageCLIArgument, getBaseUrlForStage } = require("./lib/util");

args = process.argv.slice(2);

describe("API integration tests", () => {
  const baseUrl = getBaseUrlForStage(parseStageCLIArgument(args));
  const httpService = new HttpService(baseUrl, config.app.apiRoot);

  employeeSuccessCasesIntegrationTestSuite(httpService);
  employeeErrorCasesIntegrationTestSuite(httpService);
});
