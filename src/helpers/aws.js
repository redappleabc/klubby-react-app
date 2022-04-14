

import {Auth} from 'aws-amplify';



async function signUp(username, password, email) {
    return new Promise((resolve, reject) => {
        let name = "testawsname"
        Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                name
                // other custom attributes 
            }
        }).then((user) => {
            resolve(user)
        }).catch((error)=>{
            reject(error.message)
        })
    });
}


async function confirmSignUp(username, code) {
    return new Promise((resolve, reject) => {
        Auth.confirmSignUp(username, code).then((user) => {
            resolve(user)
        }, (error) => {
            reject(error.message)
        })
    })
}



async function signIn(username, password) {
    return new Promise((resolve, reject) => {
        Auth.signIn(username, password).then((user)=>{
            resolve(user)
        }, (error)=>{
            reject(error.message)
        })
    });
}

async function _forgetPassword(username) {
    return new Promise((resolve, reject) => {
         //resolve("success");
        Auth.forgotPassword(username).then((user)=>{
            resolve(user)
        }, (error)=>{
            reject(error.message)
        })
    });
}

async function resendConfirmationCode(username) {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}

async function ResetPwdSuccess(username, code, new_password) {
    return new Promise((resolve, reject) => {
        //resolve("success");
       Auth.forgotPasswordSubmit(username, code, new_password).then((user)=>{
           resolve(user)

       }, (error)=>{
           reject(error.message)
       })
   });
}

export {signIn, signUp, confirmSignUp, resendConfirmationCode, _forgetPassword, ResetPwdSuccess }