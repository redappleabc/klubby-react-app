import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';
import { getFirebaseBackend } from "../../helpers/firebase";

import {signIn, signUp, _forgetPassword, confirmSignUp, ResetPwdSuccess} from "../../helpers/aws"

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD,
    VERIRY_CODE_SUCCESS,
    FORGET_PASSWORD_SUCCESS
} from './constants';


import {
    loginUserSuccess,
    registerUserSuccess,
    forgetPasswordSuccess,
    apiError,
} from './actions';


//Initilize firebase
const fireBaseBackend = getFirebaseBackend();


/**
 * Sets the session
 * @param {*} user 
 */

const create = new APIClient().create;

/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password, history } }) {
    // alert();
    // loginError("response");
    // yield put(loginError("error"));

    try {
        if(process.env.REACT_APP_DEFAULTAUTH === "aws"){
            const response = yield call(signIn, username, password)
            localStorage.setItem("authUser", JSON.stringify(response));
            
            yield put(loginUserSuccess(response));
        }
        else if(process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = yield call(fireBaseBackend.loginUser, username, password);
            yield put(loginUserSuccess(response));
            
        } else {
            // alert("hi")
            const response = yield call(create, '/login', { username, password });
            console.log(response)
            localStorage.setItem("authUser", JSON.stringify(response));
            console.log(JSON.stringify(response))
            yield put(loginUserSuccess(response));
        }
        history.push('/dashboard');
    } catch (error) {
        // alert();
        yield put(apiError(error));
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            yield call(fireBaseBackend.logout);
        }
        yield call(() => {
            history.push("/login");
        });
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { user } }) {
    try {
        const email = user.email;
        const password = user.password;
        const username = user.username
        if(process.env.REACT_APP_DEFAULTAUTH === "aws"){
            const response = yield call(signUp, username, password, email)
            yield put(registerUserSuccess(response));
        }
        else if(process.env.REACT_APP_DEFAULTAUTH === "firebase"){
            const response = yield call(fireBaseBackend.registerUser, email, password);
            yield put(registerUserSuccess(response));
        } else {
            const response = yield call(create, '/register', user);
            yield put(registerUserSuccess(response));
        }
        
    } catch (error) {
        console.log(error)
        yield put(apiError(error));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username, history } }) {
    try {
        if(process.env.REACT_APP_DEFAULTAUTH === "aws"){
            const response = yield call(_forgetPassword, username)
                console.log(response);
            if (response) {
                history.push("/verify-pwd-reset");
                yield put(
                    forgetPasswordSuccess(
                      "Reset code are sended to your mailbox, check there first"
                    )
                  );
            }  
        }
        else if(process.env.REACT_APP_DEFAULTAUTH === "firebase"){
            const response = yield call(fireBaseBackend.forgetPassword, username);
            if (response) {
               
                yield put(
                    forgetPasswordSuccess(
                    "Reset link are sended to your mailbox, check there first"
                    )
                
                );
            }
        } else {
            const response = yield call(create, '/forget-pwd', { username });
            yield put(forgetPasswordSuccess(response));
        }
    } catch (error) {
        console.log(error)

        yield put(apiError(error));
    }
}

function* verifycode({payload: {username, code, history}}) {
    console.log(username + code);
    try {
        if (process.env.REACT_APP_DEFAULTAUTH == "aws") {
            const response = yield call(confirmSignUp, username, code);
            if (response) {
                history.push('/login');
            }
        }
    } catch (error) {
        console.log(error)
        yield put(apiError(error))
    }
}

function* ForgetPasswordSuccess({payload: {username, code, new_password, history}}) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH == "aws") {
            const response = yield call(ResetPwdSuccess, username, code, new_password);
            if (response) {
                history.push('/login');
            }
        }
    } catch (error) {
        console.log(error)
        yield put(apiError(error))
    }
}
export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchVerifyCode() {
    yield takeEvery(VERIRY_CODE_SUCCESS, verifycode);
}

export function* watchForgetPasswordSuccess() {
    yield takeEvery(FORGET_PASSWORD_SUCCESS, ForgetPasswordSuccess);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
        fork(watchForgetPasswordSuccess),
        fork(watchVerifyCode),
    ]);
}

export default authSaga;