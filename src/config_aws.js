let config_userPool;
if(process.env.REACT_APP_ENVIRONMENT === "development"){
    config_userPool= {
        region: 'us-east-1',
        userPoolId: 'us-east-1_picEXpb5v',
        userPoolWebClientId: '79f3mof59ks2p1oi9jn3thuv63'
    };
}else if(process.env.REACT_APP_ENVIRONMENT === "production"){
    config_userPool = {
        region: 'us-east-1',
        userPoolId: 'us-east-1_Se7EAAzAP',
        userPoolWebClientId: '3et7u65bmjp6doas8cgttbi6qu'
    };
}

export default config_userPool;
