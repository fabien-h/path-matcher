const testPathAgainstCompiledTemplate = (
  pathname: string,
  compiledTemplate: PathMatcher.ICompiledTemplate,
): boolean | PathMatcher.IPathTestResult => {
  /**
   * Test the path
   */
  if (!compiledTemplate.regex.test(pathname)) return false;
  if (pathname.replace(compiledTemplate.regex, '')) return false;

  /**
   * Build the answer
   */
  let segments: { [key: string]: string | null } = {};
  pathname
    .split('/')
    .filter(segment => Boolean(segment))
    .forEach((segment, index) => {
      if (compiledTemplate.segments[index])
        segments[compiledTemplate.segments[index] as string] = segment;
    });
  compiledTemplate.segments
    .filter(segment => Boolean(segment))
    .forEach(segment => {
      if (!segments[segment as string]) segments[segment as string] = null;
    });

  return {
    pathname,
    template: compiledTemplate.name,
    name: compiledTemplate.name,
    segments,
  };
};

export default testPathAgainstCompiledTemplate;
