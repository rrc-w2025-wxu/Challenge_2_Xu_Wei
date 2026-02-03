
import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: [
      "src/**/*.ts",
      "!src/server.ts", // Exclude server startup file
      "!src/types/**/*.ts", // Exclude type definitions
  ],
};

export default config;
