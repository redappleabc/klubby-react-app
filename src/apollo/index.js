import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
    ApolloLink
} from "@apollo/client";


import { Auth } from "aws-amplify";

import { getMainDefinition } from '@apollo/client/utilities';
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";



const getToken = async () => {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return token;
}


let url;
if (process.env.REACT_APP_ENVIRONMENT === "development") {
    url = "https://myqrbz2nvvhlbg2r6i36olffji.appsync-api.us-east-1.amazonaws.com/graphql"
} else if (process.env.REACT_APP_ENVIRONMENT === "production") {
    url = "https://fy2cjmehurd6hdh2fj5wtyhk4u.appsync-api.us-east-1.amazonaws.com/graphql"
}


let socketURL;
if (process.env.REACT_APP_ENVIRONMENT === "development") {
    socketURL = "wss://myqrbz2nvvhlbg2r6i36olffji.appsync-realtime-api.us-east-1.amazonaws.com/graphql"
} else if (process.env.REACT_APP_ENVIRONMENT === "production") {
    socketURL = "wss://fy2cjmehurd6hdh2fj5wtyhk4u.appsync-realtime-api.us-east-1.amazonaws.com/graphql"
}


const auth = {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: async () => getToken()
}


const region = 'us-east-1';

const httpLink = createHttpLink({
    uri: url,
});

const authLink = createAuthLink({
    url: url,
    region: region,
    auth: auth
})

const wsLink = createSubscriptionHandshakeLink({ url, region, auth }, httpLink)

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);




const apollo_client = new ApolloClient({
    //fetch,
    link: splitLink,
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
    }
});



  
// const apollo_client = new AWSAppSyncClient({
//     url: URL,
//     region: region,
//     auth: auth
//   })




export default apollo_client;
