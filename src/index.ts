import createMatcher from './createMatcher';

export default {
  createMatcher: createMatcher,
};

// const testRoute = {
//   path: '/foo/{bar}',
//   name: 'foo',
//   paramsChecks: {
//     bar: /([a-z]|[A-Z]|[0-9])*/,
//   },
// };

// const testRoute2 = {
//   path: '/foo/{bar?}/{baz}',
//   name: 'foo',
//   paramsChecks: {
//     baz: /([a-z]|[A-Z]|[0-9])*/,
//   },
// };
