declare namespace PathMatcher {
  export interface IPathToCompile {
    name?: string;
    paramsChecks?: {
      [key: string]: RegExp | string;
    };
    path: string;
  }

  export interface ICompiledPath {
    matcher: RegExp;
    name: string;
    path: string;
  }

  export interface IPathMatcher {
    addMatcher: (pathToAdd: ICompiledPath) => void;
    findPath: (pathname: string) => void | false;
    paths: { [key: string]: ICompiledPath };
    testPath: (pathname: string, template: string) => boolean;
    compilePath: (
      pathToCompileParam: PathMatcher.IPathToCompile | string,
    ) => PathMatcher.ICompiledPath;
  }
}

//test: (pathToMatch: string) => { [key: string]: RegExp | string } | false;

// test: (pathToMatch: string) => {
//   return pathToMatch ? false : false;
// },
