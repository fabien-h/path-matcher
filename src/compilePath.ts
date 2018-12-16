/**
 * Authorized characters, see https://tools.ietf.org/html/rfc3986#section-2
 */
const pathAllowedCharsRegex = /([a-z]|[A-Z]|[0-9]|\.|\-|\_|\~|\!|\$|\&|\'|\(|\)|\*|\+|\,|\;|\=|\:|\@|\%|\?|\#|\[|\])*/;

const createMatcher = (
  pathToCompileParam: PathMatcher.IPathToCompile | string,
): PathMatcher.ICompiledPath => {
  /**
   * Check and format the initial paht to compile as an object
   */
  let pathToCompile: PathMatcher.IPathToCompile;
  if (typeof pathToCompileParam === 'string')
    pathToCompile = {
      path: pathToCompileParam,
      name: pathToCompileParam,
    };
  else pathToCompile = pathToCompileParam;
  if (
    !pathToCompile.path ||
    typeof pathToCompile.path !== 'string' ||
    / /.test(pathToCompile.path)
  )
    throw new TypeError('Invalid path. Need to be a string without spaces.');
  if (!pathToCompile.name) pathToCompile.name = pathToCompile.path;
  if (typeof pathToCompileParam !== 'string' && pathToCompileParam.paramsChecks)
    pathToCompile.paramsChecks = pathToCompileParam.paramsChecks;
  else pathToCompile.paramsChecks = {};

  /**
   * Build the regular expression from the parametters
   */
  const params: Array<string> = pathToCompile.path.split('/');
  const matcher = new RegExp(
    `${params
      .map(
        (param: string): string => {
          /**
           * If nothing, return null
           */
          if (!param || param === '') return '';

          /**
           * For name params
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
            if (pathToCompile.paramsChecks && pathToCompile.paramsChecks[key]) {
              /**
               * If the key has been defined as a regex, we take
               * the source to avoid duplicating slashes
               * otherwise, we take the direct string
               */
              if (typeof pathToCompile.paramsChecks[key] === 'string')
                regex = '/' + pathToCompile.paramsChecks[key];
              else
                regex =
                  '/' + (pathToCompile.paramsChecks[key] as RegExp).source;
              //'/' + (route.paramsChecks[key].source ? route.paramsChecks[key].source : route.paramsChecks[key]);
            } else regex = `/${pathAllowedCharsRegex.source}`;
            if (isOptionnal) regex = `(${regex})?`;

            return regex;
          }

          /**
           * Hardcoded param
           */
          return `/${param}`;
        },
      )
      .filter((param: string) => {
        // console.log(param);
        return Boolean(param);
      })
      .join('')}/?`,
  );

  return {
    matcher,
    name: pathToCompile.name,
    path: pathToCompile.path,
  };
};

export default createMatcher;
