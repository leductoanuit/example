//@flow
import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {CoreApi} from '../../service/CoreApi';
import type {ApiProps} from '../../service/Api';
import {authAction} from '../../service/auth/action';
import {cleanAppAction} from '../../service/app/action';
import {UIUtils} from '../../service/Utils';

//$FlowFixMe[cannot-resolve-module]
import {Toast} from 'primereact/toast';
//$FlowFixMe[cannot-resolve-module]
import {InputText} from 'primereact/inputtext';
//$FlowFixMe[cannot-resolve-module]
import {Button} from 'primereact/button';

type Props = {};

export function AppLogin(props: Props): React$Node {
  const history = useHistory();

  const conf = useSelector((state) => state.settings);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const {i18n} = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lang] = useState('en');

  const toastRef = useRef();
  const apiRef = useRef();

  useEffect(() => {
    console.log('effect // init api');
    let apiProps: ApiProps = {
      ...conf,
      token: auth.token,
    };
    let api = new CoreApi(apiProps);
    apiRef.current = api;
  }, [conf, auth]);

  useEffect(() => {
    if (auth.isAuth) {
      history.replace('/');
    }
  }, [history, auth]);

  const goDashboard = () => {
    history.replace('/');
  };


  const _onLogin: (evt: any) => void = (evt: any) => {
    let api: ?CoreApi = apiRef.current;
    if (!api) {
      console.log('Api not setup');
      return;
    }
    console.log('perform login');
    api
      .login({username, password, lang})
      .then((resp) => resp.data)
      .then((resp) => {
        console.log('Got response', resp);
        let {errors, data} = resp;
        if (errors.length > 0) {
          console.log('login /// return errors', errors);
          UIUtils.showError({errors, toast: toastRef.current});
          return;
        }
       // console.log(data);
        // UIUtils.showInfo({detail: 'success', toast: toastRef.current});
        dispatch(
          authAction({
            username,
            lang,
            ...data,
          }),
        );
        //rest application cache
        dispatch(cleanAppAction());
        goDashboard();
      })
      .catch((error) => {
        console.log('login // network error', error);
      });
  };

  return (
    <div className="pages-body login-page p-d-flex p-flex-column">
      <Toast ref={toastRef} />
      {/*<div className="topbar p-p-3 p-d-flex p-jc-between p-flex-row p-ai-center">
        <div className="topbar-left p-ml-3 p-d-flex">
          <div className="logo">
            <img src="assets/layout/images/logo2x.png" alt="" />
          </div>
        </div>
        <div className="topbar-right p-mr-3 p-d-flex">
          <Button
            onClick={goDashboard}
            type="button"
            label="DASHBOARD"
            className="p-button-text p-button-plain topbar-button"></Button>
        </div>
      </div>
      */}

      <div className="p-as-center p-mt-auto p-mb-auto">
        <div className="pages-panel card p-d-flex p-flex-column">
          <div className="pages-header p-px-3 p-py-1">
            <h2>LOGIN</h2>
          </div>
          <div className="p-d-flex p-jc-center" style={{width: '400px'}}>
            <div style={{width: 120}} className="pt-3">
              <img
                src={`assets/layout/images/nb-logo-red-200.png`}
                alt="nb-logo-200"
              />
            </div>
          </div>
          <h4>IOT Dashboard</h4>
          <div className="input-panel p-d-flex p-flex-column p-px-3">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="text"
                  id="inputgroup1"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label htmlFor="inputgroup1">Email</label>
              </span>
            </div>

            <div className="p-inputgroup p-mt-3 p-mb-4">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="password"
                  id="inputgroup2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                      _onLogin(e);
                    }
                  }}
                />
                <label htmlFor="inputgroup2">Password</label>
              </span>
            </div>
          </div>
          <Button
            className="login-button p-mb-4 p-px-3 mx-3"
            label="LOGIN"
            onClick={_onLogin}></Button>
            <p>
            Powered by Aucontech Co., Ltd &#169; Copyright 2023 <br/>

 
            </p>
        </div>
      </div>
    </div>
  );
}