// @ts-check

/** @type {import('jest').Config} */
const config = {
  testPathIgnorePatterns: ["app-example/"],
  setupFilesAfterEnv: ["./test-setup.js"],
  testEnvironment: "jsdom",
  preset: "jest-expo",
};

module.exports = config;
