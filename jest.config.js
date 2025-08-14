module.exports = {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
  roots: ["./"],
  moduleFileExtensions: ["js", "cjs", "mjs", "json", "node"],
  clearMocks: true,
  collectCoverage: false,
  transform: {},
  testTimeout: 120000,
};
