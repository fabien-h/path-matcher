(() => {
  const pathMatcher = require('../dist/index.umd.js');
  const pathAllowedCharsRegex = /([a-z]|[A-Z]|[0-9]|\.|\-|\_|\~|\!|\$|\&|\'|\(|\)|\*|\+|\,|\;|\=|\:|\@|\%|\?|\#|\[|\])*/;

  describe('Build matchers from strings.', () => {
    test('Harcoded path.', () => {
      expect(pathMatcher.compileTemplate('/foo/bar/baz')).toEqual({
        template: '/foo/bar/baz',
        name: '/foo/bar/baz',
        regex: /\/foo\/bar\/baz\/?/,
        segments: [null, null, null],
      });
    });

    test('Harcoded path without initial slash.', () => {
      expect(pathMatcher.compileTemplate('foo/bar/baz')).toEqual({
        template: 'foo/bar/baz',
        name: 'foo/bar/baz',
        regex: /\/foo\/bar\/baz\/?/,
        segments: [null, null, null],
      });
    });

    test('Harcoded path width trailing slash.', () => {
      expect(pathMatcher.compileTemplate('/foo/bar/baz/')).toEqual({
        template: '/foo/bar/baz/',
        name: '/foo/bar/baz/',
        regex: /\/foo\/bar\/baz\/?/,
        segments: [null, null, null],
      });
    });

    test('Path with parametters.', () => {
      expect(pathMatcher.compileTemplate('/foo/{bar}/{baz}')).toEqual({
        template: '/foo/{bar}/{baz}',
        name: '/foo/{bar}/{baz}',
        regex: new RegExp(
          `\/foo\/${pathAllowedCharsRegex.source}\/${
            pathAllowedCharsRegex.source
          }\/?`,
        ),
        segments: [null, 'bar', 'baz'],
      });
    });

    test('Path with optional parametters.', () => {
      expect(pathMatcher.compileTemplate('/foo/{bar}/{baz?}')).toEqual({
        template: '/foo/{bar}/{baz?}',
        name: '/foo/{bar}/{baz?}',
        regex: new RegExp(
          `\/foo\/${pathAllowedCharsRegex.source}(\/${
            pathAllowedCharsRegex.source
          })?\/?`,
        ),
        segments: [null, 'bar', 'baz'],
      });
    });
  });
})();
