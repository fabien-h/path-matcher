(() => {
  const pathMatcher = require('../dist/index.js');

  describe('aaa', () => {
    test('aaa', () => {
      console.log(pathMatcher);
      pathMatcher.testPath('/foo/toto', '/foo/{bar}');

      expect(1).toEqual(1);
    });
  });
})();
