(() => {
  const pathMatcher = require('../dist/index.umd.js');

  pathMatcher.addTemplate('/foo/bar');
  pathMatcher.addTemplate('/foo/{bar}');
  pathMatcher.addTemplate({
    name: 'foobar-baz',
    template: '/foobar/baz',
  });
  pathMatcher.addTemplate({
    name: 'full-template',
    paramsChecks: {
      bar: /[0-9]*/,
    },
    template: '/fulltemplate/{bar}/{baz?}',
  });

  describe('Find pre compiled and stored template.', () => {
    test('Simple fully hardcoded template.', () => {
      expect(pathMatcher.hasPath('/foo/bar')).toEqual({
        name: '/foo/bar',
        pathname: '/foo/bar',
        segments: {},
        template: '/foo/bar',
      });
    });

    test('Simple template with one segment.', () => {
      expect(pathMatcher.hasPath('/foo/baz')).toEqual({
        name: '/foo/{bar}',
        pathname: '/foo/baz',
        segments: { bar: 'baz' },
        template: '/foo/{bar}',
      });
    });

    test('Simple template with meta data.', () => {
      expect(pathMatcher.hasPath('/foobar/baz')).toEqual({
        name: 'foobar-baz',
        pathname: '/foobar/baz',
        segments: {},
        template: 'foobar-baz',
      });
    });

    test('Full template with meta data, params, optionnals and checks.', () => {
      expect(pathMatcher.hasPath('/fulltemplate/123/hello')).toEqual({
        name: 'full-template',
        pathname: '/fulltemplate/123/hello',
        segments: { bar: '123', baz: 'hello' },
        template: 'full-template',
      });
    });

    test('Full template with meta data, params, optionnals and checks. Without the optionnal.', () => {
      expect(pathMatcher.hasPath('/fulltemplate/123')).toEqual({
        name: 'full-template',
        pathname: '/fulltemplate/123',
        segments: { bar: '123', baz: null },
        template: 'full-template',
      });
    });

    test('Full template with meta data, params, optionnals and checks. With param that does not pass the check.', () => {
      expect(pathMatcher.hasPath('/fulltemplate/world/hello')).toEqual(false);
    });

    test('Path that does not exists.', () => {
      expect(pathMatcher.hasPath('/bar/baz')).toEqual(false);
    });
  });
})();
