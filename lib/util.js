const config = require("../config");

const parseStageCLIArgument = (args) => {
  if (!args || !args.length) {
    return "default";
  }

  const stageArgument = args.find((argument) =>
    argument.toLocaleLowerCase().includes("stage"),
  );

  if (!stageArgument) {
    return "default";
  }

  return stageArgument.split("=").pop();
};

const getBaseUrlForStage = (stage) => {
  if (!stage || typeof stage !== "string") {
    return config.app.baseUrl;
  }

  const stageLowerCase = stage.toLocaleLowerCase();

  switch (stageLowerCase) {
    case "dev":
    case "development":
      return config.app.devBaseUrl;
    case "qa":
      return config.app.qaBaseUrl;
    case "uat":
      return config.app.uatBaseUrl;
    case "staging":
      return config.app.stagingBaseUrl;
    case "main":
    case "master":
    case "production":
    case "prod":
      return config.app.prodBaseUrl;
    default:
      return config.app.baseUrl;
  }
};

module.exports = {
  parseStageCLIArgument,
  getBaseUrlForStage,
};
