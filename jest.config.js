

module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: [
      "/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates)"
  ],
  verbose: false,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!dist/**',
  ]
  } 