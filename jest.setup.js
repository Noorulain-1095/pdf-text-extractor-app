// Mock console warnings to suppress them during tests
global.console = {
    ...console,
    warn: jest.fn(),
    log: jest.fn()
  };
  