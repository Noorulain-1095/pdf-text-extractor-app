module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy', // Mock CSS files
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Setup Jest-DOM
    verbose: true, // Show detailed output
  };
  