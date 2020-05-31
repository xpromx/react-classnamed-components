module.exports = {
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  transformIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  preset: "ts-jest"
}
