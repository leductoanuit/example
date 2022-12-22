import type {AdminApi} from './AdminApi';

export type ApiErrInfo = {
  error?: any,
  errors?: any,
};
export type ApiErrHandler = (errInf: ApiErrInfo) => any;

export type ApiDataOpts = {
  api?: Promise<any>,
  name?: string,
  errHandler?: ApiErrHandler,
};

const getApiData: (options: ApiDataOpts) => any = async (
  options: ApiDataOpts,
) => {
  let {api, name, errHandler} = options;
  name = name || '';
  if (!api) {
    return;
  }
  return await api
    .then((resp) => resp.data)
    .then((resp) => {
      let {errors, data} = resp;
      if (errors.length > 0) {
        console.log(`${name} // return errors`, errors);
        errHandler && errHandler({errors});
        return null;
      }
      return data;
    })
    .catch((error) => {
      console.log(`${name} // network error`, error);
      errHandler && errHandler({error});
      return null;
    });
};

const getFactoriesOfGroups: (
  groupIds: any[],
  api: AdminApi,
  errHandler: ApiErrHandler,
) => any = async (
  groupIds: any[],
  api: AdminApi,
  errHandler: ApiErrHandler,
) => {
  let start = 0;
  let limit = 0;
  let joins = [];
  let filters = {
    byGroupIds:
      'exists (select 1 from FactoryGrpLnk lnk' +
      ' where lnk.factory.id = obj.id' +
      ' and lnk.group.id in (:groupIds))',
  };
  let params = {
    groupIds,
  };
  if (!api) {
    return null;
  }
  let apiPm = api.getFactories({joins, filters, params, start, limit});
  let data = await getApiData({
    api: apiPm,
    name: 'getFactories',
    errHandler,
  });
  if (!data) {
    return null;
  }
  return data.list;
};

const ApiUtils = {
  getApiData,
  getFactoriesOfGroups,
};

export {ApiUtils};
