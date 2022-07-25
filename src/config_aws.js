
const config_userPool = {
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USERPOOLID,
    userPoolWebClientId: process.env.REACT_APP_USERPOOLWEBCLIENTID,
    identityPoolId: ""
};

const config_storage = {
    bucket: process.env.REACT_APP_KLUB_AVATAR_BUCKET, //REQUIRED -  Amazon S3 bucket
    region: process.env.REACT_APP_REGION, //OPTIONAL -  Amazon service region
}

export { config_userPool, config_storage };
