import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
} from "@apollo/client";


import { Auth } from "aws-amplify";

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { createAuthLink } from "aws-appsync-auth-link";



const getToken = async () => {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return token;
}



let URL;
if (process.env.REACT_APP_ENVIRONMENT === "development") {
    URL = "https://cnwidb2unvc2tavntg3ypn2cje.appsync-api.us-east-1.amazonaws.com/graphql"
} else if (process.env.REACT_APP_ENVIRONMENT === "production") {
    URL = "https://fy2cjmehurd6hdh2fj5wtyhk4u.appsync-api.us-east-1.amazonaws.com/graphql"
}


let socketURL;
if (process.env.REACT_APP_ENVIRONMENT === "development") {
    socketURL = "wss://cnwidb2unvc2tavntg3ypn2cje.appsync-api.us-east-1.amazonaws.com/graphql"
} else if (process.env.REACT_APP_ENVIRONMENT === "production") {
    socketURL = "wss://fy2cjmehurd6hdh2fj5wtyhk4u.appsync-api.us-east-1.amazonaws.com/graphql"
}

const wsLink = new GraphQLWsLink(createClient({
    url: socketURL,

    connectionParams: {
        authToken: () => getToken(),
    },
}));


const httpLink = createHttpLink({
    uri: URL,
});

const authLink = createAuthLink({
    url: URL,
    region: 'us-east-1',
    auth: {
        type: 'AMAZON_COGNITO_USER_POOLS',
        jwtToken: () => getToken()
    }
})


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
    cache: new InMemoryCache()
});


console.log("start split link")
console.log(URL)

export default apollo_client;
