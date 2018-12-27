(() => {
  const pathMatcher = require('../dist/index.umd.js');
  const pathAllowedCharsRegex = /([a-z]|[A-Z]|[0-9]|\.|\-|\_|\~|\!|\$|\&|\'|\(|\)|\*|\+|\,|\;|\=|\:|\@|\%|\?|\#|\[|\])*/;

  describe('Build matchers from objects', () => {
    test('Harcoded path', () => {
      expect(
        pathMatcher.compileTemplate({
          template: '/foo/bar/baz',
          name: 'my_path_name',
        }),
      ).toEqual({
        template: '/foo/bar/baz',
        name: 'my_path_name',
        regex: /\/foo\/bar\/baz\/?/,
        segments: [null, null, null],
      });
    });

    test('Harcoded path width trailing slash', () => {
      expect(
        pathMatcher.compileTemplate({
          template: '/foo/bar/baz',
          name: 'my_path_name',
        }),
      ).toEqual({
        template: '/foo/bar/baz',
        name: 'my_path_name',
        regex: /\/foo\/bar\/baz\/?/,
        segments: [null, null, null],
      });
    });

    test('Path with parametters', () => {
      expect(
        pathMatcher.compileTemplate({
          template: '/foo/{bar}',
          name: 'my_path_name',
        }),
      ).toEqual({
        template: '/foo/{bar}',
        name: 'my_path_name',
        regex: new RegExp(`\/foo\/${pathAllowedCharsRegex.source}\/?`),
        segments: [null, 'bar'],
      });
    });
  });

  test('Path with optional parametters', () => {
    expect(
      pathMatcher.compileTemplate({
        template: '/foo/{bar}/{baz?}',
        name: 'my_path_name',
      }),
    ).toEqual({
      template: '/foo/{bar}/{baz?}',
      name: 'my_path_name',
      regex: new RegExp(
        `\/foo\/${pathAllowedCharsRegex.source}(\/${
          pathAllowedCharsRegex.source
        })?\/?`,
      ),
      segments: [null, 'bar', 'baz'],
    });
  });

  test('Path with params checkers as string', () => {
    expect(
      pathMatcher.compileTemplate({
        template: '/foo/{bar}',
        name: 'my_path_name',
        paramsChecks: {
          bar: '[0-9]*',
        },
      }),
    ).toEqual({
      template: '/foo/{bar}',
      name: 'my_path_name',
      regex: new RegExp(`\/foo\/[0-9]*\/?`),
      segments: [null, 'bar'],
    });
  });

  test('Path with params checkers as regex', () => {
    expect(
      pathMatcher.compileTemplate({
        template: '/foo/{bar}',
        name: 'my_path_name',
        paramsChecks: {
          bar: /[0-9]*/,
        },
      }),
    ).toEqual({
      template: '/foo/{bar}',
      name: 'my_path_name',
      regex: new RegExp(`\/foo\/[0-9]*\/?`),
      segments: [null, 'bar'],
    });
  });
})();
