import {combineReducers} from 'redux';
import auth from '../service/auth/reducers';
import conn from '../service/conn/reducers';
import settings from '../service/settings/reducers';
import app from '../service/app/reducers';
import global from '../service/global/reducers';
import devicedetail from '../service/devicedetail/reducers';

export default combineReducers({auth, conn, settings, app, global, devicedetail});
