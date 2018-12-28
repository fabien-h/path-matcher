<img width="100" height="28" src="https://raw.githubusercontent.com/fabien-h/path-matcher/master/img/acta.png"/>
<img width="232" height="28" src="https://raw.githubusercontent.com/fabien-h/path-matcher/master/img/path-matcher.png"/>

# Path-Matcher @acta/path-matcher

To compile a regex matcher from a path template and test paths against a regex matcher. This is meant to be used as an utilit for a router.

## Table of Contents

- [Basic use case](#basic-use-case)
- [Store compiled templates](#store-compiled-templates)
- [Test against a compiled template](#test-against-a-compiled-template)
- [Check if a path matches a stored template](#check-if-a-path-matches-a-stored-template)
- [Dev scripts](#dev-scripts)

## Basic use case

Test a path against a template with `testPath( path, template )`. If the path matches with the template, an object with the name, the pathname and the segment values is returned. Otherwise, the test returns false.

```JavaScript
import pathMatcher from '@acta/path-matcher';

// Strict template
pathMatcher.testPath('/foo/bar', '/foo/bar');
/**
  {
    name: '/foo/bar', <= the template is unnamed
    pathname: '/foo/bar',
    segments: {},
    template: '/foo/bar',
  }
 */

// Template with variable segment
pathMatcher.testPath('/foo/bar', '/foo/{baz}')
/**
  {
    name: '/foo/{baz}',
    pathname: '/foo/bar',
    segments: { baz: 'bar' }, <= the value for the segment 'baz'
    template: '/foo/{baz}',
  }
 */

// Template with optional segment
pathMatcher.testPath('/foo', '/foo/{bar?}')
/**
  {
    name: '/foo/{bar?}',
    pathname: '/foo',
    segments: { bar: null }, <= note the optional segment at null
    template: '/foo/{bar?}',
  }
 */

// No match
pathMatcher.testPath('/foo/bar', '/bar/foo'); // false
```

## Store compiled templates

You can store templates in the `pathMatcher` object. They will be compiled for later use.

```JavaScript
import pathMatcher from '@acta/path-matcher';

// As a simple string
pathMatcher.addTemplate('/foo/{bar?}');

// As a template with meta data
pathMatcher.addTemplate({
  name: 'foobar',
  paramsChecks: {
    bar: /[0-9]?/
  },
  template: '/foo/{bar?}'
});
```

> The compiled template will be accessible in `pathMatcher.compiledTemplates`.

## Test against a compiled template

When a template has been stored, you can test a path against it.

```JavaScript
import pathMatcher from '@acta/path-matcher';

pathMatcher.testPathAgainstCompiledTemplate('foobar', 'foo/123');
/**
  {
    name: 'foobar', <= now the template is named
    pathname: 'foo/baz',
    segments: {
      bar: '123'
    },
    template: '/foo/{bar?}',
  }
 */
```

> This is more of an internal method used to find a template, but you can use it to build a router.

## Check if a path matches a stored template

```JavaScript
import pathMatcher from '@acta/path-matcher';

// Add a simple template
pathMatcher.addTemplate('/foo/bar/{baz?}');

// Add the template with meta data
pathMatcher.addTemplate({
  name: 'foobar',
  paramsChecks: {
    bar: /[0-9]?/
  },
  template: '/foo/{bar?}'
});

// Find the path
pathMatcher.findPath('foo/123');
/**
  {
    name: 'foobar',
    pathname: 'foo/baz',
    segments: {
      bar: '123'
    },
    template: '/foo/{bar?}',
  }
 */

// Find an unknown path
pathMatcher.findPath('bar/123');
/**
  false
 */
```

## Dev scripts

Scripts :

- `npm run dev` to dev (build, test and watch)
- `npm run build` to build the production version
- `npm run release` to release a new version. Relies on [release-it](https://github.com/webpro/release-it) for deployments.

To develop in local using the package from another application or package, go for a symlink: `npm link /the/absolute/path/url`.

To publish: `npm publish --access=public`.
