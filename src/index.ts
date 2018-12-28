import {
  IPathMatcher,
  ITemplateToCompile,
  ICompiledTemplate,
  IPathTestResult,
} from './types';
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
const hasPath = (pathname: string): false | IPathTestResult => {
  let result: false | IPathTestResult = false;
  for (const compiledTemplate of matcher.compiledTemplates) {
    result = testPathAgainstCompiledTemplate(pathname, compiledTemplate);
    if (Boolean(result)) break;
  }
  return result;
};

const matcher: IPathMatcher = {
  addTemplate,
  compileTemplate,
  hasPath,
  compiledTemplates: [],
  testPathAgainstCompiledTemplate,
  testPath,
};

export default matcher;
