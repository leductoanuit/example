// @flow
import Axios from 'axios';

export type ApiProps = {
  apiUrl: string,
  apiVersion: string,
  token?: string,
};

export type GetType = {
  url: string,
};

export type PostType = {
  url: string,
  data: any,
  timeout?: number,
};

export type PutType = {
  url: string,
  data: any,
};

export type DelType = {
  url: string,
};

export type QueryObjsType = {
  search?: string,
  filters?: any,
  params?: any,
  joins?: any[],
  sorts?: string[],
  start: number,
  limit: number,
  fields?: any[],
  groupBys?: any[],
  havFilters?: any,
};

export type SendObjType = {
  data: any,
};

const defHeaders = {
  'Content-Type': 'application/json',
};

const defAxiosConf = {
  headers: {
    ...defHeaders,
  },
  timeout: 3000000,
};

const http = Axios.create();
http.defaults.timeout = 300000;

const formatUrl = (url: string, args: any): string => {
  const regex: RegExp = /\{([^}])+\}/g;
  return url.replace(regex, function (x: string) {
    const pName: string = x.substring(1, x.length - 1);
    if (args[pName] !== undefined) {
      return args[pName];
    }
    return x;
  });
};

const postWithTimeout = ({url, data, timeout, axiosConf}): Promise<any> => {
  const timer = new Promise((resolve) => {
    setTimeout(resolve, timeout, {timeout: true});
  });
  if (!axiosConf) {
    axiosConf = {
      ...defAxiosConf,
    };
  }
  return Promise.race([http.post(url, data, axiosConf), timer]);
};

export class Api {
  apiUrl: string;
  apiVersion: string;
  axiosConf: any;
  constructor(props: ApiProps) {
    this.config(props);
    this.axiosConf = {
      ...defAxiosConf,
    };
    if (props.token) {
      let token: string = props.token;
      this.setToken({token});
    }
  }

  setToken({token}: {token: string}) {
    this.axiosConf = {
      ...this.axiosConf,
      headers: {
        ...this.axiosConf.headers,
        token,
      },
    };
  }

  config(props: ApiProps) {
    this.apiUrl = props.apiUrl;
    this.apiVersion = props.apiVersion;
  }

  prepareUrl(uri: string, params: any): string {
    let url = formatUrl(this.apiUrl + '/' + this.apiVersion + uri, params);
    return url;
  }

  get({url}: {url: string}): Promise<any> {
    let axiosConf = this.axiosConf;
    return http.get(url, axiosConf);
  }

  post(args: PostType): Promise<any> {
    let axiosConf = this.axiosConf;
    let {url, data, timeout} = args;
    if (timeout) {
      return postWithTimeout({url, data, timeout, axiosConf});
    }
    return http.post(url, data, axiosConf);
  }

  put(args: PutType): Promise<any> {
    let axiosConf = this.axiosConf;
    let {url, data} = args;
    return http.put(url, data, axiosConf);
  }

  delete(args: DelType): Promise<any> {
    let axiosConf = this.axiosConf;
    let {url} = args;
    return http.delete(url, axiosConf);
  }
}
