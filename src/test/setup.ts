import '@testing-library/jest-dom';
import { resetApiMocks, setupApiMocks } from './mockApi';

beforeAll(() => {
  setupApiMocks();
});

afterEach(() => {
  resetApiMocks();
});