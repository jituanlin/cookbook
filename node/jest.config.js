module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  roots: ["./"],
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(ts|js)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};
