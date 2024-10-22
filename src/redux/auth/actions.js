import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    API_FAILED,
    LOGIN_ERROR,
    VERIRY_CODE_SUCCESS
} from './constants';


export const loginUser = (username, password, history) => ({
    type: LOGIN_USER,
    payload: { username, password, history }
});

export const loginUserSuccess = (user) => {
    return{
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
};

export const registerUser = (user) => ({
    type: REGISTER_USER,
    payload: { user }
});

export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});

export const verifyCodeSuccess = (username, code, history) => ({
    type: VERIRY_CODE_SUCCESS,
    payload: {username, code, history}
})

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history }
});

export const forgetPassword = (username, history) => ({
    type: FORGET_PASSWORD,
    payload: { username, history }
});

export const forgetPasswordSuccess = (username, code, new_password, history) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: { username, code, new_password, history }
});

export const apiError = (error) => ({
    type: API_FAILED,
    payload: error
});

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    payload: error
});