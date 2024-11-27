import '@testing-library/jest-dom';
import { server } from './src/libs/msw/node';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
