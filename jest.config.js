module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: [
    "/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates)",
  ],
  verbose: true,
  collectCoverageFrom: ["src/**/*.ts", "!dist/**"],
};
