import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    LOGIN_ERROR,
    API_FAILED,
    VERIRY_CODE_SUCCESS
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    error: "",
    loading: false
};


const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case REGISTER_USER:
            return { ...state, loading: true };

        case REGISTER_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case VERIRY_CODE_SUCCESS:
            return { ...state, loading: false, error: null };

        case LOGOUT_USER:
            return { ...state, user: null };

        case FORGET_PASSWORD:
            return { ...state, username: action.payload.username, loading: true };

        case FORGET_PASSWORD_SUCCESS:
            return { ...state, loading: false, error: null };

        case API_FAILED:
            return { ...state, loading: false, error: action.payload };

        case LOGIN_ERROR:
            return { ...state, loading: false, error: action.payload };
    

        default: return { ...state };
    }
}

export default Auth;