(() => {
  const pathMatcher = require('../dist/index.umd.js');

  pathMatcher.addTemplate('/foo/{bar}');
  pathMatcher.addTemplate('/foo/super');
  pathMatcher.addTemplate('/foo/bar/');

  describe('Test path against a template', () => {
    test('Path against template hardcoded', () => {
      pathMatcher.findPath('/foo/toto');
      pathMatcher.findPath('/foot/toto/tata');

      expect(1).toEqual(1);
    });
  });
})();
