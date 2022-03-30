

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
            console.log(error)
        })
    });
}


async function confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}



async function signIn(username, password) {
    return new Promise((resolve, reject) => {
        Auth.signIn(username, password).then((user)=>{
            resolve(user)
        }, (error)=>{
            console.log(error)
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

export {signIn, signUp}