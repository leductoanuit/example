import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
//import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';

import reducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['global'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(cb: () => void): any {
  const enhancer = compose(applyMiddleware(thunk));
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store, null, cb);
  return {store, persistor};
}
