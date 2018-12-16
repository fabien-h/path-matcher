(() => {
  const pathMatcher = require('../dist/index.js');

  describe('Test path against a template', () => {
    test('Path against template hardcoded', () => {
      expect(pathMatcher.testPath('/foo/bar', '/foo/bar')).toEqual({
        name: '/foo/bar',
        pathname: '/foo/bar',
        segments: {},
        template: '/foo/bar',
      });
    });

    test('Path against template with param', () => {
      expect(pathMatcher.testPath('/foo/bar', '/foo/{baz}')).toEqual({
        name: '/foo/{baz}',
        pathname: '/foo/bar',
        segments: { baz: 'bar' },
        template: '/foo/{baz}',
      });
    });

    test('Path against template with optional param', () => {
      expect(pathMatcher.testPath('/foo', '/foo/{bar?}')).toEqual({
        name: '/foo/{bar?}',
        pathname: '/foo',
        segments: { bar: null },
        template: '/foo/{bar?}',
      });
    });

    test('Wrong hardcoded path', () => {
      expect(pathMatcher.testPath('/baz', '/foo/bar')).toEqual(false);
    });

    test('Wrong path with params', () => {
      expect(pathMatcher.testPath('/baz', '/foo/{bar}')).toEqual(false);
    });

    test('Wrong path longer tham params', () => {
      expect(pathMatcher.testPath('/foo/bar/baz', '/foo/{bar}')).toEqual(false);
    });
  });
})();
