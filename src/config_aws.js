let config_userPool;
if(process.env.REACT_APP_ENVIRONMENT === "development"){
    config_userPool= {
        region: 'us-east-1',
        userPoolId: 'us-east-1_picEXpb5v',
        userPoolWebClientId: '79f3mof59ks2p1oi9jn3thuv63',
        identityPoolId: ""
    };
}else if(process.env.REACT_APP_ENVIRONMENT === "production"){
    config_userPool = {
        region: 'us-east-1',
        userPoolId: 'us-east-1_Se7EAAzAP',
        userPoolWebClientId: '3et7u65bmjp6doas8cgttbi6qu'
    };
}

const config_storage = {
    bucket: 'klubby-dev-klub-avatar-bucket', //REQUIRED -  Amazon S3 bucket
    region: 'us-east-1', //OPTIONAL -  Amazon service region
}

export  {config_userPool, config_storage};
