// @flow
import type {
  ApiProps,
  PostType,
  DelType,
  QueryObjsType,
  SendObjType,
} from './Api';
import {Api} from './Api';

const API_MONTH_INFO = '/app/month-info';
const API_APP_REPORT = '/app/report';
const API_DOWNLOAD = '/download/{file}';
const API_IMAGE = '/image/{file}';



const API_PROFILES = '/profiles';
const API_PROFILE_UPDATE = '/profile/update';
const API_PROFILE_DELETE = '/profiles/{id}';
const API_PROFILE_LINK_ROLES = '/profiles/{id}/link-roles';
const API_PROFILE_UNLINK_ROLES = '/profiles/{id}/unlink-roles';

const API_REPORT_TPLS = '/reporttpls';
const API_REPORT_TPL_UPDATE = '/reporttpl/update';
const API_REPORT_TPL_UPLOAD = '/reporttpls/{id}/upload';
const API_REPORT_TPL_DELETE = '/reporttpls/{id}';
const API_REPORT_TPL_GETFILES = '/reporttpls/{id}';
const API_REPORT_TPL_DELFILES = '/reporttpl/delete-files';

const API_ROLES = '/roles';
const API_ROLE_UPDATE = '/role/update';
const API_ROLE_DELETE = '/roles/{id}';
// const API_ROLE_ASSIGNPERMS = '/roles/{id}/assignperms';
const API_ROLE_LINK_PERMS = '/roles/{id}/link-perms';
const API_ROLE_UNLINK_PERMS = '/roles/{id}/unlink-perms';

const API_SECPERMS = '/secperms';
const API_SECPERM_UPDATE = '/secperm/update';
const API_SECPERM_DELETE = '/secperms/{id}';

const API_USERS = '/users';
const API_USER_UPDATE = '/user/update';
const API_USER_DELETE = '/users/{id}';
const API_USER_CHANGEPWD = '/user/changepwd';

const API_USERGRPS = '/usergroups';
const API_USERGRP_UPDATE = '/usergroup/update';
const API_USERGRP_DELETE = '/usergroups/{id}';
const API_USERGRP_ROLES = '/usergroups/{id}/roles';
const API_USERGRP_USERS = '/usergroups/{id}/users';
const API_USERGRP_LINK_ROLES = '/usergroups/{id}/link-roles';
const API_USERGRP_UNLINK_ROLES = '/usergroups/{id}/unlink-roles';
const API_USERGRP_LINK_USERS = '/usergroups/{id}/link-users';
const API_USERGRP_UNLINK_USERS = '/usergroups/{id}/unlink-users';


const API_FACTORIES = '/factories';
const API_FACTORY_UPDATE = '/factory/update';
const API_FACTORY_DELETE = '/factories/{id}';

const API_FACTORYUSERS = '/factoryusers';
const API_FACTORYUSER_UPDATE = '/factoryuser/update';
const API_FACTORYUSER_DELETE = '/factoryusers/{id}';

const API_FACGROUPS = '/facgroups';
const API_FACGROUP_UPDATE = '/facgroup/update';
const API_FACGROUP_DELETE = '/facgroups/{id}';
const API_FACGROUP_LINK_FACS = '/facgroups/{id}/link-factories';
const API_FACGROUP_UNLINK_FACS = '/facgroups/{id}/unlink-factories';


const API_OPERATORS = '/operators';
const API_OPERATOR_UPDATE = '/operator/update';
const API_OPERATOR_DELETE = '/operators/{id}';

const API_SHIFTS = '/shifts';
const API_SHIFT_UPDATE = '/shift/update';
const API_SHIFT_DELETE = '/shifts/{id}';

const API_PRODKPIS = '/prodkpis';
const API_PRODKPI_UPDATE = '/prodkpi/update';
const API_PRODKPI_DELETE = '/prodkpis/{id}';
const API_PRODKPI_KPI_DATA = '/prodkpi/kpi-data';
const API_PRODKPI_DATA_GROUP = '/prodkpi/kpi-data-group';

const API_MACHMODELS = '/machmodels';
const API_MACHMODEL_UPDATE = '/machmodel/update';
const API_MACHMODEL_DELETE = '/machmodels/{id}';

const API_PRODRECS = '/prodrecs';
const API_PRODREC_UPDATE = '/prodrec/update';
const API_PRODREC_DELETE = '/prodrecs/{id}';
const API_PRODREC_UPLOAD = '/prodrec/upload';
const API_PRODREC_APPROVE_PRODRECS = '/prodrec/approve-prodrecs';
const API_PRODREC_DELETE_PRODRECS = '/prodrec/delete-prodrecs';
const API_PRODREC_FETCH_DATA = '/prodrec/fetch-data';

const API_LINEGROUPS = '/linegroups';
const API_LINEGROUP_UPDATE = '/linegroup/update';
const API_LINEGROUP_DELETE = '/linegroups/{id}';

const API_ERRORRECS = '/errorrecs';
const API_ERRORREC_UPDATE = '/errorrec/update';
const API_ERRORREC_DELETE = '/errorrecs/{id}';

const API_MACHERRORS = '/macherrors';
const API_MACHERROR_UPDATE = '/macherror/update';
const API_MACHERROR_DELETE = '/macherrors/{id}';

const API_PRODRECMD_DELETE = '/prodrecsmd/{id}';
const API_PRODRECMD_UPLOAD = '/prodrecmd/upload';
const API_PRODRECSMD = '/prodrecsmd';
const API_PRODRECMD_APPROVE_PRODRECSMD = '/prodrecmd/approve-prodrecsmd';
const API_PRODRECMD_DELETE_PRODRECSMD = '/prodrecmd/delete-prodrecsmd ';
const API_PRODRECMD_FECTH_DATA = '/prodrecmd/fetch-data';
const API_PRODRECMD_UPDATE = '/prodrecmd/update';

////////////////////////////////////////////////////////////////////////////////
// Lean
////////////////////////////////////////////////////////////////////////////////
const API_AUDMEASURES = '/audmeasures';
const API_AUDMEASURE_UPDATE = '/audmeasure/update';
const API_AUDMEASURE_DELETE = '/audmeasures/{id}';

const API_LEANAUDITS = '/leanaudits';
const API_LEANAUDIT_FETCH_DATA = '/leanaudit/fetch-data';
const API_LEANAUDIT_UPDATE = '/leanaudit/update';
const API_LEANAUDIT_DELETE = '/leanaudits/{id}';

const API_LEANAUD_ITEMS = '/leanauditems';
const API_LEANAUD_ITEM_UPDATE = '/leanauditem/update';
const API_LEANAUD_ITEM_DELETE = '/leanauditems/{id}';
const API_LEANAUD_ITEM_FETCH_DATA = '/leanauditem/fetch-data';


const API_MLTRECS = '/extsimltdatas';
const API_MLTREC_UPDATE = '/extsimltdata/update';
const API_MLTREC_DELETE = '/extsimltdatas/{id}';
const API_MLTREC_IMPORT_MLT = '/extsimltdata/import-mlt';
const API_MLTREC_APPROVE_MLTRECS = '/extsimltdata/approve-mltrecs';
const API_MLTREC_DELETE_MLTRECS = '/extsimltdata/delete-mltrecs';
const API_MLTREC_FETCH_DATA = '/extsimltdata/fetch-data';
const API_MEDIAN_MLT = '/extsimltdata/getytdmlt';

const API_MLTROADMAPS = '/mltroadmaps';
const API_MLTROADMAP_UPDATE = '/mltroadmap/update';
const API_MLTROADMAP_DELETE = '/mltroadmaps/{id}';
const API_MLTROADMAP_FETCH_DATA = '/mltroadmap/fetch-data';

const API_LEANREPORTS = '/leanreports';
const API_LEANREPORT_UPDATE = '/leanreport/update';
const API_LEANREPORT_DELETE = '/leanreports/{id}';
const API_LEANREPORT_FETCH_DATA = '/leanreport/fetch-data';

const API_MINILINEAUDITS = '/minilineaudits';
const API_MINILINEAUDIT_UPDATE = '/minilineaudit/update';
const API_MINILINEAUDIT_DELETE = '/minilineaudits/{id}';
const API_MINILINEAUDIT_FETCH_DATA = '/minilineaudit/fetch-data';




const API_FARMINGAREAS = '/farmingareas';
const API_FARMINGAREAS_MENU = '/farmingareasformenu';
const API_FARMINGAREA_UPDATE = '/farmingarea/update';
const API_FARMINGAREA_DELETE = '/farmingareas/{id}';

const API_DEVICES = '/devices';
const API_DEVICE_UPDATE = '/device/update';
const API_DEVICE_DELETE = '/devices/{id}';
const API_DEVICE_CONTROL = '/device/control';

const API_FISHPONDS = '/fishponds';
const API_FISHPOND_UPDATE = '/fishponds/update';
const API_FISHPOND_DELETE = '/fishponds/{id}';
const API_FISHPOND_LINK_DEVICES = '/fishpond/{id}/link-devices'
const API_FISHPOND_UNLINK_DEVICES = '/fishpond/{id}/unlink-devices'

const API_DEVICEDETAIL = '/devicedetails';
const API_DEVICEDETAIL_UPDATE = '/devicedetail/update';
const API_DEVICEDETAIL_DELETE = '/devicedetail/{id}';
const API_GETDEVICEDETAIL_BYFISHPOND = '/getdevicedetailbyfishpond';

const API_FEEDS = '/feeds';

type GenReportOpts = {
  name: any,
  format?: any,
  params?: any,
  extra?: any,
};

export class AdminApi {
  api: Api;
  constructor(props: ApiProps) {
    this.api = new Api(props);
  }

  getDownloadUrl(file: string): string {
    let buf = new Buffer(file);
    let url = this.api.prepareUrl(API_DOWNLOAD, {file: buf.toString('base64')});
    return url;
  }

  getImageUrl(file: string): string {
    let buf = new Buffer(file);
    let url = this.api.prepareUrl(API_IMAGE, {file: buf.toString('base64')});
    return url;
  }

  getMonthInfo(params: any): Promise<any> {
    params = params || {};
    let url = this.api.prepareUrl(API_MONTH_INFO, {});
    let data = {
      data: {},
      params: {
        ...params,
      },
    };
    let args: PostType = {url, data};
    return this.api.post(args);
  }

  generateReport(opts: GenReportOpts): Promise<any> {
    let url = this.api.prepareUrl(API_APP_REPORT, {});
    let data = {
      data: {
        ...opts,
      },
      params: {
        ...opts.params,
      },
    };
    let args: PostType = {url, data};
    return this.api.post(args);
  }


  getRoles(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_ROLES, {});
    return this.api.post({url, data: {...args}});
  }

  updateRole(obj: any): Promise<any> {
    let url = this.api.prepareUrl(API_ROLE_UPDATE, {});
    let args: PostType = {url, data: {data: {...obj}}};
    return this.api.post(args);
  }

  deleteRole(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_ROLE_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  linkRoleToPerms(id: number, permIds: any[]): Promise<any> {
    let url = this.api.prepareUrl(API_ROLE_LINK_PERMS, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          permIds,
        },
      },
    };
    return this.api.post(args);
  }

  unlinkRoleToPerms(id: number, permIds: any[]): Promise<any> {
    let url = this.api.prepareUrl(API_ROLE_UNLINK_PERMS, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          permIds,
        },
      },
    };
    return this.api.post(args);
  }

  // assignRolePerms(id: number, perms: any[]): Promise<any> {
  //   let url = this.api.prepareUrl(API_ROLE_ASSIGNPERMS, {id});
  //   let args: PostType = {url, data: [...perms]};
  //   return this.api.post(args);
  // }

  getRolePerms(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_SECPERMS, {});
    return this.api.post({url, data: {...args}});
  }

  updateRolePerm(obj: any): Promise<any> {
    let url = this.api.prepareUrl(API_SECPERM_UPDATE, {});
    let args: PostType = {url, data: {data: {...obj}}};
    return this.api.post(args);
  }

  deleteRolePerm(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_SECPERM_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getSecPerms(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_SECPERMS, {});
    return this.api.post({url, data: {...args}});
  }

  updateSecPerm(obj: any): Promise<any> {
    let url = this.api.prepareUrl(API_SECPERM_UPDATE, {});
    let args: PostType = {url, data: {data: {...obj}}};
    return this.api.post(args);
  }

  deleteSecPerm(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_SECPERM_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getProfiles(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_PROFILES, {});
    return this.api.post({url, data: {...args}});
  }

  updateProfile(obj: any): Promise<any> {
    let url = this.api.prepareUrl(API_PROFILE_UPDATE, {});
    let args: PostType = {url, data: {data: {...obj}}};
    return this.api.post(args);
  }

  deleteProfile(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_PROFILE_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  linkProfileRoles(id: number, roles: any[]): Promise<any> {
    let url = this.api.prepareUrl(API_PROFILE_LINK_ROLES, {id});
    let args: PostType = {
      url,
      data: {
        data: [...roles],
      },
    };
    return this.api.post(args);
  }

  unlinkProfileRoles(id: number, roles: any[]): Promise<any> {
    let url = this.api.prepareUrl(API_PROFILE_UNLINK_ROLES, {id});
    let args: PostType = {
      url,
      data: {
        data: [...roles],
      },
    };
    return this.api.post(args);
  }

  getUsers(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_USERS, {});
    return this.api.post({url, data: {...args}});
  }

  updateUser(obj: any): Promise<any> {
    let url = this.api.prepareUrl(API_USER_UPDATE, {});
    let args: PostType = {url, data: {data: {...obj}}};
    return this.api.post(args);
  }

  deleteUser(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_USER_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  changePwd({login, newPass}: {login: string, newPass: string}): Promise<any> {
    let url = this.api.prepareUrl(API_USER_CHANGEPWD);
    let args: PostType = {
      url,
      data: {
        data: {
          login,
          newPass,
        },
      },
    };
    return this.api.post(args);
  }

  getUserGrps(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRPS, {});
    return this.api.post({url, data: {...args}});
  }

  getUserGrpRoles(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRP_ROLES, {id});
    let args: PostType = {url, data: {}};
    return this.api.post(args);
  }

  getUserGrpUsers(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRP_USERS, {id});
    let args: PostType = {url, data: {}};
    return this.api.post(args);
  }

  linkUserGrpToRoles(id: number, roleIds: string[]): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRP_LINK_ROLES, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          roleIds,
        },
      },
    };
    return this.api.post(args);
  }

  unlinkUserGrpToRoles(id: number, roleIds: string[]): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRP_UNLINK_ROLES, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          roleIds,
        },
      },
    };
    return this.api.post(args);
  }

  linkUserGrpToUsers(id: number, logins: string[]): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRP_LINK_USERS, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          logins,
        },
      },
    };
    return this.api.post(args);
  }

  unlinkUserGrpToUsers(id: number, logins: string[]): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRP_UNLINK_USERS, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          logins,
        },
      },
    };
    return this.api.post(args);
  }

  updateUserGrp(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRP_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteUserGrp(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_USERGRP_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getReportTpls(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_REPORT_TPLS, {});
    return this.api.post({url, data: {...args}});
  }

  getReportTplUploadUrl(id: number): string {
    let url = this.api.prepareUrl(API_REPORT_TPL_UPLOAD, {id});
    // return this.api.post({url, data: {}});
    return url;
  }

  updateReportTpl(obj: any): Promise<any> {
    let url = this.api.prepareUrl(API_REPORT_TPL_UPDATE, {});
    let args: PostType = {url, data: {data: {...obj}}};
    return this.api.post(args);
  }

  deleteReportTpl(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_REPORT_TPL_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getReportTplFiles(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_REPORT_TPL_GETFILES, {id});
    let args = {url};
    return this.api.get(args);
  }

  deleteReportTplFiles(paths: string[]): Promise<any> {
    let url = this.api.prepareUrl(API_REPORT_TPL_DELFILES);
    let args: PostType = {
      url,
      data: {
        data: {
          paths,
        },
      },
    };
    return this.api.post(args);
  }

  getFactories(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_FACTORIES, {});
    return this.api.post({url, data: {...args}});
  }

  updateFactory(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_FACTORY_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteFactory(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_FACTORY_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getFactoryUsers(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_FACTORYUSERS, {});
    return this.api.post({url, data: {...args}});
  }

  updateFactoryUser(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_FACTORYUSER_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteFactoryUser(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_FACTORYUSER_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getFacGroups(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_FACGROUPS, {});
    return this.api.post({url, data: {...args}});
  }

  updateFacGroup(obj: any): Promise<any> {
    let url = this.api.prepareUrl(API_FACGROUP_UPDATE, {});
    let args: PostType = {url, data: {data: {...obj}}};
    return this.api.post(args);
  }

  deleteFacGroup(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_FACGROUP_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  linkFacGroupToFacs(id: number, factoryIds: any[]): Promise<any> {
    let url = this.api.prepareUrl(API_FACGROUP_LINK_FACS, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          factoryIds,
        },
      },
    };
    return this.api.post(args);
  }

  unlinkFacGroupToFacs(id: number, factoryIds: any[]): Promise<any> {
    let url = this.api.prepareUrl(API_FACGROUP_UNLINK_FACS, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          factoryIds,
        },
      },
    };
    return this.api.post(args);
  }



  getMltRecs(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_MLTRECS, {});
    return this.api.post({url, data: {...args}});
  }

  updateMltRec(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_MLTREC_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteMltRec(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_MLTREC_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  fetchMltRecData(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_MLTREC_FETCH_DATA, {});
    return this.api.post({url, data: {...args}});
  }

  getMltRecImportUrl(): string {
    let url = this.api.prepareUrl(API_MLTREC_IMPORT_MLT, {});
    return url;
  }

  approveMltRecs(ids: any[], params?: any): Promise<any> {
    let body = {
      data: {ids},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let url = this.api.prepareUrl(API_MLTREC_APPROVE_MLTRECS, {});
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteMltRecs(ids: any[], params?: any): Promise<any> {
    let body = {
      data: {ids},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let url = this.api.prepareUrl(API_MLTREC_DELETE_MLTRECS, {});
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  getOperators(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_OPERATORS, {});
    return this.api.post({url, data: {...args}});
  }

  updateOperator(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_OPERATOR_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteOperator(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_OPERATOR_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getShifts(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_SHIFTS, {});
    return this.api.post({url, data: {...args}});
  }

  updateShift(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_SHIFT_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteShift(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_SHIFT_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getProdKpis(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_PRODKPIS, {});
    return this.api.post({url, data: {...args}});
  }

  updateProdKpi(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_PRODKPI_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteProdKpi(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_PRODKPI_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  loadProdKpiData(args: SendObjType): Promise<any> {
    let url = this.api.prepareUrl(API_PRODKPI_KPI_DATA, {});
    return this.api.post({url, data: {...args}});
  }

  getProdRecs(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_PRODRECS, {});
    return this.api.post({url, data: {...args}});
  }

  updateProdRec(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_PRODREC_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteProdRec(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_PRODREC_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getProdRecUploadUrl(): string {
    let url = this.api.prepareUrl(API_PRODREC_UPLOAD, {});
    return url;
  }

  approveProdRecs(ids: any[], params?: any): Promise<any> {
    let body = {
      data: {ids},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let url = this.api.prepareUrl(API_PRODREC_APPROVE_PRODRECS, {});
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteProdRecs(ids: any[], params?: any): Promise<any> {
    let body = {
      data: {ids},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let url = this.api.prepareUrl(API_PRODREC_DELETE_PRODRECS, {});
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  fetchProdRecData(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_PRODREC_FETCH_DATA, {});
    return this.api.post({url, data: {...args}});
  }

  getLineGroups(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_LINEGROUPS, {});
    return this.api.post({url, data: {...args}});
  }

  updateLineGroup(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_LINEGROUP_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteLineGroup(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_LINEGROUP_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getErrorRecs(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_ERRORRECS, {});
    return this.api.post({url, data: {...args}});
  }

  updateErrorRec(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_ERRORREC_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteErrorRec(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_ERRORREC_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getMachErrors(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_MACHERRORS, {});
    return this.api.post({url, data: {...args}});
  }

  updateMachError(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_MACHERROR_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteMachError(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_MACHERROR_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Lean
  //////////////////////////////////////////////////////////////////////////////
  getAudMeasures(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_AUDMEASURES, {});
    return this.api.post({url, data: {...args}});
  }

  updateAudMeasure(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_AUDMEASURE_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteMeasure(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_AUDMEASURE_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getLeanAudits(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_LEANAUDITS, {});
    return this.api.post({url, data: {...args}});
  }

  updateLeanAudit(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_LEANAUDIT_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteLeanAudit(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_LEANAUDIT_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  fetchLeanAuditData(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_LEANAUDIT_FETCH_DATA, {});
    return this.api.post({url, data: {...args}});
  }

  getLeanAudItems(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_LEANAUD_ITEMS, {});
    return this.api.post({url, data: {...args}});
  }

  updateLeanAudItem(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_LEANAUD_ITEM_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteLeanAudItem(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_LEANAUD_ITEM_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  fetchLeanAudItemData(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_LEANAUD_ITEM_FETCH_DATA, {});
    return this.api.post({url, data: {...args}});
  }



  updateMltRoadmap(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_MLTROADMAP_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteMltRoadmap(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_MLTROADMAP_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  fetchMltRoadmapData(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_MLTROADMAP_FETCH_DATA, {});
    return this.api.post({url, data: {...args}});
  }

  getLeanReports(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_LEANREPORTS, {});
    return this.api.post({url, data: {...args}});
  }

  updateLeanReport(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_LEANREPORT_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteLeanReport(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_LEANREPORT_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  fetchLeanReportData(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_LEANREPORT_FETCH_DATA, {});
    return this.api.post({url, data: {...args}});
  }

  getMiniLineAudits(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_MINILINEAUDITS, {});
    return this.api.post({url, data: {...args}});
  }

  updateMiniLineAudit(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_MINILINEAUDIT_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteMiniLineAudit(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_MINILINEAUDIT_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  fetchMiniLineAuditData(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_MINILINEAUDIT_FETCH_DATA, {});
    return this.api.post({url, data: {...args}});
  }

 
  

  deleteMachModel(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_MACHMODEL_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  updateMachModel(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_MACHMODEL_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteProdRecMd(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_PRODRECMD_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  getProdRecMdUploadUrl(): string {
    let url = this.api.prepareUrl(API_PRODRECMD_UPLOAD, {});
    return url;
  }

  getMachModels(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_MACHMODELS, {});
    return this.api.post({url, data: {...args}});
  }

  getProdRecsMd(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_PRODRECSMD, {});
    return this.api.post({url, data: {...args}});
  }

  deleteProdRecsMd(ids: any[], params?: any): Promise<any> {
    let body = {
      data: {ids},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let url = this.api.prepareUrl(API_PRODRECMD_DELETE_PRODRECSMD, {});
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  updateProdRecMd(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_PRODRECMD_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  approveProdRecsMd(ids: any[], params?: any): Promise<any> {
    let body = {
      data: {ids},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let url = this.api.prepareUrl(API_PRODRECMD_APPROVE_PRODRECSMD, {});
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  fetchProdMdRecData(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_PRODRECMD_FECTH_DATA, {});
    return this.api.post({url, data: {...args}});
  }


  getKpiByGroup(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_PRODKPI_DATA_GROUP, {});
    return this.api.post({url, data: {...args}});
  }



  getMedianMlt(args: SendObjType): Promise<any> {
    let url = this.api.prepareUrl(API_MEDIAN_MLT, {});
    return this.api.post({url, data: {...args}});
  }

  getFarmingAreas(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_FARMINGAREAS, {});
    return this.api.post({url, data: {...args}});
  }

  getFarmingForMenu(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_FARMINGAREAS_MENU, {});
    return this.api.post({url, data: {...args}});
  }

  updateFarmingArea(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_FARMINGAREA_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  deleteFarmingArea(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_FARMINGAREA_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }
  

  updateDevice(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_DEVICE_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }

  getDevices(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_DEVICES, {});
    return this.api.post({url, data: {...args}});
  }

  controlDevice(args: SendObjType): Promise<any> {
    let url = this.api.prepareUrl(API_DEVICE_CONTROL, {});
    return this.api.post({url, data: {...args}});
  }

  
  deleteDevice(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_DEVICE_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  updateFishPond(obj: any, params?: any): Promise<any> {
    let url = this.api.prepareUrl(API_FISHPOND_UPDATE, {});
    let body = {
      data: {...obj},
    };
    if (params) {
      body = {
        ...body,
        params: {...params},
      };
    }
    let args: PostType = {url, data: body};
    return this.api.post(args);
  }


  getFishPonds(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_FISHPONDS, {});
    return this.api.post({url, data: {...args}});
  }

  deleteFishPond(id: number): Promise<any> {
    let url = this.api.prepareUrl(API_FISHPOND_DELETE, {id});
    let args: DelType = {url};
    return this.api.delete(args);
  }

  linkDevicesToFishPonds(id: number, deviceIds: any[]): Promise<any> {
    let url = this.api.prepareUrl(API_FISHPOND_LINK_DEVICES, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          deviceIds,
        },
      },
    };
    return this.api.post(args);
  }

  unLinkDevicesToFishPonds(id: number, deviceIds: any[]): Promise<any> {
    let url = this.api.prepareUrl(API_FISHPOND_UNLINK_DEVICES, {id});
    let args: PostType = {
      url,
      data: {
        data: {
          deviceIds,
        },
      },
    };
    return this.api.post(args);
  }

  getDeviceDetails(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_DEVICEDETAIL, {});
    return this.api.post({url, data: {...args}});
  }

  getDeviceDetailByFishPond(args: SendObjType): Promise<any> {
    let url = this.api.prepareUrl(API_GETDEVICEDETAIL_BYFISHPOND, {});
    return this.api.post({url, data: {...args}});
  }

  getFeeds(args: QueryObjsType): Promise<any> {
    let url = this.api.prepareUrl(API_FEEDS, {});
    return this.api.post({url, data: {...args}});
  }



}





