const packageJson = require("./package");

module.exports = {
  name: packageJson.name,
  displayName: packageJson.name,
  preset: "ts-jest",
  roots: ["<rootDir>/__tests__"],
  testEnvironment: "node",
  verbose: true,
};
