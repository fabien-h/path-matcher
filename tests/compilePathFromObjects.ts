(() => {
  const pathMatcher = require('../dist/index.js');
  const pathAllowedCharsRegex = /([a-z]|[A-Z]|[0-9]|\.|\-|\_|\~|\!|\$|\&|\'|\(|\)|\*|\+|\,|\;|\=|\:|\@|\%|\?|\#|\[|\])*/;

  describe('Build matchers from objects', () => {
    test('Harcoded path', () => {
      expect(
        pathMatcher.compilePath({
          path: '/foo/bar/baz',
          name: 'my_path_name',
        }),
      ).toEqual({
        path: '/foo/bar/baz',
        name: 'my_path_name',
        matcher: /\/foo\/bar\/baz\/?/,
      });
    });

    test('Harcoded path width trailing slash', () => {
      expect(
        pathMatcher.compilePath({
          path: '/foo/bar/baz',
          name: 'my_path_name',
        }),
      ).toEqual({
        path: '/foo/bar/baz',
        name: 'my_path_name',
        matcher: /\/foo\/bar\/baz\/?/,
      });
    });

    test('Path with parametters', () => {
      expect(
        pathMatcher.compilePath({
          path: '/foo/{bar}',
          name: 'my_path_name',
        }),
      ).toEqual({
        path: '/foo/{bar}',
        name: 'my_path_name',
        matcher: new RegExp(`\/foo\/${pathAllowedCharsRegex.source}\/?`),
      });
    });
  });

  test('Path with optional parametters', () => {
    expect(
      pathMatcher.compilePath({
        path: '/foo/{bar}/{baz?}',
        name: 'my_path_name',
      }),
    ).toEqual({
      path: '/foo/{bar}/{baz?}',
      name: 'my_path_name',
      matcher: new RegExp(
        `\/foo\/${pathAllowedCharsRegex.source}(\/${
          pathAllowedCharsRegex.source
        })?\/?`,
      ),
    });
  });

  test('Path with params checkers as string', () => {
    expect(
      pathMatcher.compilePath({
        path: '/foo/{bar}',
        name: 'my_path_name',
        paramsChecks: {
          bar: '[0-9]*',
        },
      }),
    ).toEqual({
      path: '/foo/{bar}',
      name: 'my_path_name',
      matcher: new RegExp(`\/foo\/[0-9]*\/?`),
    });
  });

  test('Path with params checkers as regex', () => {
    expect(
      pathMatcher.compilePath({
        path: '/foo/{bar}',
        name: 'my_path_name',
        paramsChecks: {
          bar: /[0-9]*/,
        },
      }),
    ).toEqual({
      path: '/foo/{bar}',
      name: 'my_path_name',
      matcher: new RegExp(`\/foo\/[0-9]*\/?`),
    });
  });
})();
