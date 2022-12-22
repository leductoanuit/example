// @flow
// import _ from 'lodash';
// import moment from 'moment';
import {AuthConst} from './AppConstant';

const isIncludeAll = (bigArr: any[], subArr: any[]): boolean => {
  for (let el of subArr) {
    if (!bigArr.includes(el)) {
      return false;
    }
  }
  return true;
};

const isIncludeAny = (bigArr: any[], subArr: any[]): boolean => {
  for (let el of subArr) {
    if (bigArr.includes(el)) {
      return true;
    }
  }
  return false;
};

const checkRolesPerms = (
  roles: any[],
  perms: any[],
  all: boolean,
  avaiRoles: any[],
  avaiPerms: any[],
): boolean => {
  roles = roles || [];
  perms = perms || [];
  avaiRoles = avaiRoles || [];
  avaiPerms = avaiPerms || [];

  let ok = all;
  if (all) {
    if (roles.length > 0) {
      ok = isIncludeAll(avaiRoles, roles);
    }
    if (ok && perms.length > 0) {
      ok = isIncludeAll(avaiPerms, perms);
    }
    return ok;
  }

  if (roles.length < 1 && perms.length < 1) {
    return true;
  }

  if (roles.length > 0) {
    ok = isIncludeAny(avaiRoles, roles);
  }

  if (!ok && perms.length > 0) {
    ok = isIncludeAny(avaiPerms, perms);
  }
  return ok;
};

const isAuth = ({
  auth,
  roles,
  perms,
  all,
}: {
  auth: any,
  roles?: string[],
  perms?: string[],
  all?: boolean,
}): boolean => {
  all = !!all;
  roles = roles || [];
  perms = perms || [];
  let {factory, facRoles, facPerms, sysRoles, sysPerms} = auth;
  let b = checkRolesPerms(roles, perms, all, sysRoles, sysPerms);
  if (b) {
    return true;
  }
  if (factory) {
    return checkRolesPerms(roles, perms, all, facRoles, facPerms);
  }
  return false;
};

const getAuthLevel = ({auth}: {auth: any}): any => {
  let b = isAuth({auth, roles: ['SUPER_ADMIN', 'ADMIN']});
  if (b) {
    return AuthConst.AUTH_LVL_ADMIN;
  }
  if (
    isAuth({
      auth,
      roles: [
        'APP_ADMIN',
        'APP_SALES',
        'APP_SALES_MNG',
        'APP_SUPPORT',
        'APP_SUPPORT_MNG',
      ],
    })
  ) {
    return AuthConst.AUTH_LVL_APP;
  }

  if (
    isAuth({
      auth,
      roles: ['NB_ADMIN', 'NB_VIEWER'],
    })
  ) {
    return AuthConst.AUTH_LVL_NB;
  }

  if (
    isAuth({
      auth,
      roles: ['FACTORY_ADMIN', 'FACTORY_EDITOR', 'FACTORY_VIEWER'],
    })
  ) {
    return AuthConst.AUTH_LVL_FACTORY;
  }

  return 10000;
};

const AuthUtils = {isAuth, getAuthLevel};

export {AuthUtils};
