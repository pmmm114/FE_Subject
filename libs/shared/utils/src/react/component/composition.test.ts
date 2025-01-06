import { describe, expect } from 'vitest';
import { getComponentTypeCheck, isReactElement } from './composition';

import * as TC from './__mock__/testCase';

describe('Utils/Component/Composition', () => {
  it('should return true for a valid React element', () => {
    const element = TC.TEST_CASE.isReactElement[0].input;
    expect(isReactElement(element)).toBe(
      TC.TEST_CASE.isReactElement[0].expectedOutput,
    );
  });

  it('should return false for a non-React element', () => {
    const element = TC.TEST_CASE.isReactElement[1].input;
    expect(isReactElement(element)).toBe(
      TC.TEST_CASE.isReactElement[1].expectedOutput,
    );
  });

  it('getComponentTypeCheck', () => {
    const { children, filteredComponentName } =
      TC.TEST_CASE.getComponentTypeCheck[0].input;

    const filteredChildren = getComponentTypeCheck(
      { children },
      filteredComponentName,
    );

    expect(filteredChildren).toHaveLength(
      TC.TEST_CASE.getComponentTypeCheck[0].expectedOutput,
    );
  });
});
