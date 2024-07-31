import '@testing-library/jest-dom';
import { worker } from './mocks/browser';

// Inicia el worker antes de los tests
beforeAll(() => worker.listen());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.close());
