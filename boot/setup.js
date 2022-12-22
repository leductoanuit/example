// @flow
import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
// $FlowFixMe[cannot-resolve-module]
import {PersistGate} from 'redux-persist/integration/react';
import Axios from 'axios';

import configureStore from './configureStore';
import {saveSettingsAction} from '../service/settings/actions';
import {AppWrapper} from '../AppWrapper';

type Props = {};
type State = {
  store: any,
  persistor: any,
  storeReady: boolean,
  loading: boolean,
};

export default class Setup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let {store, persistor} = configureStore(() => {
      console.log('App store configured');
      this.setState({storeReady: true});
    });
    this.state = {
      store: store,
      persistor: persistor,
      storeReady: false,
      loading: true,
    };
  }

  componentDidMount() {
    this._initConfig();
  }

  async _initConfig(): any {
    let waitStorePm = new Promise<any>((resolve, reject) => {
      let checkStoreReady = () => {
        let {storeReady} = this.state;
        if (storeReady) {
          resolve('store ready');
          return;
        }
        setTimeout(checkStoreReady, 100);
      };
      checkStoreReady();
    });

    let configPm = new Promise<any>((resolve, reject) => {
      const http = Axios.create();
      http.defaults.timeout = 30000;
      let axiosCf = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let url = './assets/app.json';
      http
        .get(url, axiosCf)
        .then((resp) => resp.data)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log('Error loading config at: ' + url, err);
          throw err;
        });
    });

    let allPms = Promise.all([waitStorePm, configPm]);
    let arr: any[] = await allPms;
    console.log('Config ready', arr);
    let {store} = this.state;
    store.dispatch(saveSettingsAction(arr[1]));
    this.setState({loading: false});
    return 'ok';
  }

  render(): React$Node {
    let {loading} = this.state;
    return (
      <>
        {loading && <div></div>}
        {!loading && (
          <Provider store={this.state.store}>
            <PersistGate persistor={this.state.persistor}>
              <HashRouter>
                <AppWrapper />
              </HashRouter>
            </PersistGate>
          </Provider>
        )}
      </>
    );
  }
}
