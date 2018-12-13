import IRoute from './_types/IRoute';

/**
 * Authorized characters, see https://tools.ietf.org/html/rfc3986#section-2
 */
const pathAllowedCharsRegex = /([a-z]|[A-Z]|[0-9]|\.|\-|\_|\~|\!|\$|\&|\'|\(|\)|\*|\+|\,|\;|\=|\:|\@|\%|\?|\#|\[|\])*/;

const createMatcher = (route: IRoute) => {
  /**
   * Check the path
   */
  if (!route.path || typeof route.path !== 'string' || / /.test(route.path)) {
    return new TypeError('A route path need to be a string without spaces.');
  }

  const params: Array<string> = route.path.split('/');

  const regex = new RegExp(
    `/${params
      .map(param => {
        if (!param || param === '') return null;

        /**
         * For named variable params
         */
        if (/{.*}/.test(param)) {
          let key = param.replace(/{|}/g, '');

          /**
           * Check if the parametter is optionnal
           */
          const isOptionnal = /(.*)\?/.test(key);
          key = key.replace(/\?/g, '');

          /**
           * Check if we have a defined regex for the key,
           * otherwise use the default regex
           */
          let regex;
          if (route[key]) {
            /**
             * If the key has been defined as a regex, we take
             * the source to avoid duplicating slashes
             * otherwise, we take the direct string
             */
            regex = '/' + (route[key].source || route[key]);
          } else regex = '/' + pathAllowedCharsRegex.source;
          if (isOptionnal) regex = `(${regex})?`;

          return regex;
        }

        /**
         * Hardcoded param
         */
        return param;
      })
      .filter(param => Boolean(param))
      .join('')}/?`,
  );

  return regex;
};

export default createMatcher;
