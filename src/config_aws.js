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
        userPoolId: 'us-east-1_O44xuYX6z',
        userPoolWebClientId: '6irj935dduuu0lm0aslj6mo237'
    };
}

export default config_userPool;
