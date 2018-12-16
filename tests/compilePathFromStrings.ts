(() => {
  const pathMatcher = require('../dist/index.js');
  const pathAllowedCharsRegex = /([a-z]|[A-Z]|[0-9]|\.|\-|\_|\~|\!|\$|\&|\'|\(|\)|\*|\+|\,|\;|\=|\:|\@|\%|\?|\#|\[|\])*/;

  describe('Build matchers from strings', () => {
    test('Harcoded path', () => {
      expect(pathMatcher.compilePath('/foo/bar/baz')).toEqual({
        path: '/foo/bar/baz',
        name: '/foo/bar/baz',
        matcher: /\/foo\/bar\/baz\/?/,
      });
    });

    test('Harcoded path width trailing slash', () => {
      expect(pathMatcher.compilePath('/foo/bar/baz/')).toEqual({
        path: '/foo/bar/baz/',
        name: '/foo/bar/baz/',
        matcher: /\/foo\/bar\/baz\/?/,
      });
    });

    test('Path with parametters', () => {
      expect(pathMatcher.compilePath('/foo/{bar}/{baz}')).toEqual({
        path: '/foo/{bar}/{baz}',
        name: '/foo/{bar}/{baz}',
        matcher: new RegExp(
          `\/foo\/${pathAllowedCharsRegex.source}\/${
            pathAllowedCharsRegex.source
          }\/?`,
        ),
      });
    });

    test('Path with optional parametters', () => {
      expect(pathMatcher.compilePath('/foo/{bar}/{baz?}')).toEqual({
        path: '/foo/{bar}/{baz?}',
        name: '/foo/{bar}/{baz?}',
        matcher: new RegExp(
          `\/foo\/${pathAllowedCharsRegex.source}(\/${
            pathAllowedCharsRegex.source
          })?\/?`,
        ),
      });
    });
  });
})();
