import compilePath from './compilePath';

/**
 * Add a path to the list
 */
const addMatcher = (compiledPath: PathMatcher.ICompiledPath): void => {
  if (!matcher.paths[compiledPath.name])
    matcher.paths[compiledPath.name] = compiledPath;
};

/**
 * Find a path in the list
 */
const findPath = (pathname: string): void => {
  console.log(pathname);
  for (const compiledPath of Object.values(matcher.paths)) {
    console.log(compiledPath);
  }
};

/**
 * Test a path against a template
 */
const testPath = (pathname: string, template: string): boolean => {
  /**
   * Check the regex to test
   */
  if (typeof template !== 'string') return false;

  /**
   * Build the matcher
   */
  const matcher = compilePath(template);

  console.log(matcher.matcher);
  console.log(matcher.matcher.test('/popo'));
  console.log(matcher.matcher.test('/popo'));

  return false;
};

const matcher: PathMatcher.IPathMatcher = {
  addMatcher,
  compilePath,
  findPath,
  paths: {},
  testPath,
};

export default matcher;
