import { IPathTestResult } from './types';
import compileTemplate from './compileTemplate';
import testPathAgainstCompiledTemplate from './testPathAgainstCompiledTemplate';

/**
 * Test a path against a template
 */
const testPath = (
  pathname: string,
  template: string,
): boolean | IPathTestResult => {
  /**
   * Check the regex to test
   */
  if (typeof template !== 'string') return false;

  /**
   * Build the matcher
   */
  const compiledTemplate = compileTemplate(template);

  return testPathAgainstCompiledTemplate(pathname, compiledTemplate);
};

export default testPath;
