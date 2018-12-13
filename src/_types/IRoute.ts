export default interface IRoute {
  path: string;
  name: string;
  paramsChecks: {
    [key: string]: string;
  };
}
