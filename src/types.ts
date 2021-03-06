export interface ITemplateToCompile {
  name?: string;
  paramsChecks?: {
    [key: string]: RegExp | string;
  };
  template: string;
}

export interface ICompiledTemplate {
  name: string;
  regex: RegExp;
  segments: Array<string | null>;
  template: string;
}

export interface IPathTestResult {
  name: string;
  pathname: string;
  segments: {
    [key: string]: string | null;
  };
  template: string;
}

export interface IPathMatcher {
  readonly addTemplate: (templateToAdd: ITemplateToCompile) => void;
  readonly compiledTemplates: Array<ICompiledTemplate>;
  readonly compileTemplate: (
    templateToCompile: ITemplateToCompile | string,
  ) => ICompiledTemplate;
  readonly hasPath: (pathname: string) => false | IPathTestResult;
  readonly testPath: (
    pathname: string,
    template: string,
  ) => boolean | IPathTestResult;
  readonly testPathAgainstCompiledTemplate: (
    pathname: string,
    compiledTemplate: ICompiledTemplate,
  ) => false | IPathTestResult;
}
