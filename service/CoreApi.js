// @flow
import _ from 'lodash';
import type {ApiProps, PostType, QueryObjsType} from './Api';
import {Api} from './Api';

const API_CHECK_TOKEN = '/me';
const API_HELLO_SERVER = '/hello';
const API_LOGIN = '/login';
const API_LOGOUT = '/logout';
// const API_CHANGE_PWD = '/changePassword';
const API_CHANGE_PWD = '/user/changepwd';

const API_DOWNLOAD = '/download/{file}';
const API_CONFIGS = '/appconfigs';
const API_CONFIG_UPDATE = '/appconfig/update';
const API_CONFIG_DELETE = '/appconfigs/{id}';
const API_CONFIG_CHILDREN = '/appconfigs/{id}/children';
const API_CONFIG_DIRECT_CHILDREN = '/appconfigs/{id}/direct-children';

const isEmpty = (val) => {
  return val !== undefined && val !== null;
};

export class CoreApi {
  api: Api;
  constructor(props: ApiProps) {
    this.api = new Api(props);
  }

  hello(): Promise<any> {
    let url = this.api.prepareUrl(API_HELLO_SERVER);
    let data = {};
    return this.api.post({url, data});
  }
/// check token còn hạn hay không
  checkToken({
    token,
    timeout,
  }: {
    token: string,
    timeout?: number,
  }): Promise<any> {
    this.api.setToken({token});
    let url = this.api.prepareUrl(API_CHECK_TOKEN, {});
    let data = {};
    return this.api.post({url, data, timeout});
  } 

  ///

  login({
    username,
    password,
    lang,
    timeout,
  }: {
    username: string,
    password: string,
    lang: string,
    timeout?: number,
  }): Promise<any> {
    let url = this.api.prepareUrl(API_LOGIN, {});
    let data = {username, password, lang};
    return this.api.post({url, data, timeout});
  }

  logout(): Promise<any> {
    let url = this.api.prepareUrl(API_LOGOUT);
    let data = {};
    return this.api.post({url, data});
  }

  changePassword({
    login,
    oldPass,
    newPass,
  }: {
    login: string,
    oldPass?: string,
    newPass: string,
  }): Promise<any> {
    let url = this.api.prepareUrl(API_CHANGE_PWD);
    let data = {
      data: {
        login,
        oldPass,
        newPass,
      },
    };
    return this.api.post({url, data});
  }

  getDownloadUrl(file: string): string {
    let url = this.api.prepareUrl(API_DOWNLOAD, {file});
    return url;
  }

  getConfigs(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_CONFIGS, {});
    return this.api.post({url, data: {...args}});
  }

  getRootConfigs(key: string): Promise<any> {
    let search = '';
    let filters: any = {
      roots: 'obj.parentId = 0',
    };
    let start = 0;
    let limit = 1000000;
    let params = {};
    if (_.isString(key)) {
      filters['ckey'] = 'obj.key = :cKey';
      params['cKey'] = key;
    }
    let sorts = ['+obj.key'];
    let data = {
      search,
      start,
      limit,
      sorts,
      filters,
      params,
    };
    let url = this.api.prepareUrl(API_CONFIGS, {});
    return this.api.post({url, data});
  }

  getCfgChildren({id, direct}: {id: number, direct: boolean}): Promise<any> {
    let uri = API_CONFIG_CHILDREN;
    if (!isEmpty(direct) && direct === true) {
      uri = API_CONFIG_DIRECT_CHILDREN;
    }
    let url = this.api.prepareUrl(uri, {id});
    return this.api.get({url});
  }

  updateConfig(cfg: any): Promise<any> {
    let url = this.api.prepareUrl(API_CONFIG_UPDATE, {});
    let args: PostType = {url, data: {data: {...cfg}}};
    return this.api.post(args);
  }

  deleteConfig(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_CONFIG_DELETE, {id});
    return this.api.delete({url});
  }
}
