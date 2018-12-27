import { ITemplateToCompile, ICompiledTemplate } from './types';

/**
 * Authorized characters, see https://tools.ietf.org/html/rfc3986#section-2
 */
const pathAllowedCharsRegex: RegExp = /([a-z]|[A-Z]|[0-9]|\.|\-|\_|\~|\!|\$|\&|\'|\(|\)|\*|\+|\,|\;|\=|\:|\@|\%|\?|\#|\[|\])*/;

const compileTemplate = (
  pathToCompileParam: ITemplateToCompile | string,
): ICompiledTemplate => {
  /**
   * Check and format the initial paht to compile as an object
   */
  let pathToCompile: ITemplateToCompile;
  if (typeof pathToCompileParam === 'string')
    pathToCompile = {
      template: pathToCompileParam,
      name: pathToCompileParam,
    };
  else pathToCompile = pathToCompileParam;
  if (
    !pathToCompile.template ||
    typeof pathToCompile.template !== 'string' ||
    / /.test(pathToCompile.template)
  )
    throw new TypeError(
      `Invalid path. Need to be a string without spaces. Faulty path: "${
        pathToCompile.template
      }"`,
    );
  if (!pathToCompile.name) pathToCompile.name = pathToCompile.template;
  if (typeof pathToCompileParam !== 'string' && pathToCompileParam.paramsChecks)
    pathToCompile.paramsChecks = pathToCompileParam.paramsChecks;
  else pathToCompile.paramsChecks = {};

  /**
   * Build the regular expression from the parametters
   */
  const params: Array<string> = pathToCompile.template.split('/');
  const segments: Array<string | null> = [];
  const matcher: RegExp = new RegExp(
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
            segments.push(key);

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
          segments.push(null);
          return `/${param}`;
        },
      )
      .filter((param: string): boolean => Boolean(param))
      .join('')}/?`,
  );

  return {
    name: pathToCompile.name,
    regex: matcher,
    segments,
    template: pathToCompile.template,
  };
};

export default compileTemplate;
