export interface PageRedux {
  name?: string;
}

export interface IRoute {
  path: string;
  name: string;
  props?: unknown;
}
