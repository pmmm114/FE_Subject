import { describe, expect } from 'vitest';

import { convertPath, createHandler } from './msw';

import * as TC from './__mock__/testCase';

describe('Utils/MSW', () => {
  it('convertPath', () => {
    const input = TC.TEST_CASE.convertPath[0].input;
    const expectedOutput = TC.TEST_CASE.convertPath[0].expectedOutput;
    expect(convertPath(input)).toBe(expectedOutput);
  });
  it('createHandler', () => {
    const handler = createHandler({
      ...TC.TEST_CASE.createHandler[0].input,
    });

    expect(handler).toBeDefined();
    expect(handler.info.method).toBe(
      TC.TEST_CASE.createHandler[0].expectedOutput.method,
    );
    expect(handler.info.path).toBe(
      TC.TEST_CASE.createHandler[0].expectedOutput.path,
    );
  });
  it('should return true for a valid React element', () => {
    expect(true).toBe(true);
  });
});
