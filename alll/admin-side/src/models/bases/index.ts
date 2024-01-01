import { RESOURCE_TYPE } from "models/commons/enum";
import { Component } from "react";

export interface CustomRoute {
  id: string;
  icon?: any;
  key?: string;
  path: string;
  name?: string;
  isShow?: boolean;
  routeInfo?: Object;
  component: Component | VoidFunction | JSX.Element | any;
  children?: CustomRoute[];
}

export interface IEpicAction {
  type?: string;
  payload?: any;
}

export interface IResource {
  type: string | RESOURCE_TYPE;
  path: string;
}

export interface IListProduct {
  cate: string;
  type: Array<string>;
  brand: Array<string>;
  priceFrom: string;
  priceTo: string;
  sale: Array<string>;
  pageNo: Number;
  pageSize: Number;
  [key: string]: string | any;
}
export interface IUser {}
