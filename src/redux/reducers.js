import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Chat from './chat/reducers';
import Layout from './layout/reducer';

export default combineReducers({
    Auth,
    Chat,
    Layout
});