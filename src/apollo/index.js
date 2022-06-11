import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
    ApolloLink
} from "@apollo/client";


import { Auth } from "aws-amplify";

// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';



import { getMainDefinition } from '@apollo/client/utilities';
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";


//import AWSAppSyncClient from 'aws-appsync'
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { SubscriptionClient } from "subscriptions-transport-ws";




const getToken = async () => {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return token;
}



let url;
if (process.env.REACT_APP_ENVIRONMENT === "development") {
    url = "https://bw77ptwe3zfdbaog3owcjiogla.appsync-api.us-east-1.amazonaws.com/graphql"
} else if (process.env.REACT_APP_ENVIRONMENT === "production") {
    url = "https://fy2cjmehurd6hdh2fj5wtyhk4u.appsync-api.us-east-1.amazonaws.com/graphql"
}


let socketURL;
if (process.env.REACT_APP_ENVIRONMENT === "development") {
    socketURL = "wss://bw77ptwe3zfdbaog3owcjiogla.appsync-realtime-api.us-east-1.amazonaws.com/graphql"
} else if (process.env.REACT_APP_ENVIRONMENT === "production") {
    socketURL = "wss://fy2cjmehurd6hdh2fj5wtyhk4u.appsync-realtime-api.us-east-1.amazonaws.com/graphql"
}


// const wsLink = new WebSocketLink(
//     // new SubscriptionClient(
//     //     socketURL, {
//     //     reconnect: true,
//     //     timeout: 1,
//     //     lazy: true,
//     //     connectionParams: {
//     //         authToken: async () => getToken()
//     //     },

//     // }),
//     {
//         uri: socketURL,

//         options: {
//             lazy: true,
//             reconnect: true,
//             connectionParams: {
//                 authToken: async () => getToken()
//             }
//         }
//     }
// );








const auth = {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: async () => getToken()
}







const region = 'us-east-1';



// const wsLink = new GraphQLWsLink(createClient({
//     url: socketURL,
//     connectionParams: {
//         authToken: async () => getToken() ,
//     },
// }));


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


// const splitLink = ApolloLink.from([
//     authLink,
//     wsLink,
//   ]);



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
