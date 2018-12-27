import { IPathMatcher, ITemplateToCompile, ICompiledTemplate } from './types';
import compileTemplate from './compileTemplate';
import testPathAgainstCompiledTemplate from './testPathAgainstCompiledTemplate';
import testPath from './testPath';

/**
 * Add a path to the list
 */
const addTemplate = (templateToAdd: ITemplateToCompile | string): void => {
  const pathname: string =
    typeof templateToAdd === 'string' ? templateToAdd : templateToAdd.template;

  if (
    matcher.compiledTemplates.find(
      (compiledTemplate: ICompiledTemplate) =>
        compiledTemplate.template === pathname,
    )
  )
    throw new Error(`Cannot add the same path twice. Faulty path: ${pathname}`);

  matcher.compiledTemplates.push(compileTemplate(templateToAdd));
};

/**
 * Find a path in the list
 */
const findPath = (pathname: string): void => {
  console.log(pathname);

  for (const compiledPath of matcher.compiledTemplates) {
    console.log('compiledPath', compiledPath);
    console.log(compiledPath.regex.test(pathname));
  }

  // for (const compiledPath of Object.values(matcher.paths)) {
  //   console.log(compiledPath);
  // }
};

const matcher: IPathMatcher = {
  addTemplate,
  compileTemplate,
  findPath,
  compiledTemplates: [],
  testPathAgainstCompiledTemplate,
  testPath,
};

export default matcher;
