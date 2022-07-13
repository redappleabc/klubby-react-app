import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split
} from "@apollo/client";


import { Auth } from "aws-amplify";

import { getMainDefinition } from '@apollo/client/utilities';
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";



const getToken = async () => {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return token;
}

const url = process.env.REACT_APP_GRAPHQL_API_URL


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
    link: splitLink,
    cache: new InMemoryCache()
});


export default apollo_client;
