import pathMatcher from '../dist_dev/index.js';

describe('Build Regex from paths', () => {
  test('Simple URL', () => {
    console.log(
      pathMatcher.createMatcher({
        path: '/foo/bar/baz',
        name: 'toto',
      }),
    );

    expect(1).toBe(1);
  });
});
