module.exports = {
  preset: "ts-jest",
  testRegex: ".*/__tests__/.*.ts$",
  rootDir: "./src",
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/$1",
  },
};
