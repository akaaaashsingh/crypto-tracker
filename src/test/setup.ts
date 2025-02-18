import '@testing-library/jest-dom';
import { setupApiMocks, resetApiMocks } from "@/test/mockApi";

beforeAll(() => {
  setupApiMocks();
});

afterEach(() => {
  resetApiMocks();
});

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});