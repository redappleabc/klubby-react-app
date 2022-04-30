import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
  } from "@apollo/client";
  import {Auth} from "aws-amplify";



import {createAuthLink} from "aws-appsync-auth-link";

const getToken = async () =>{
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return token;
}


let URL;



if(process.env.REACT_APP_ENVIRONMENT === "development"){
    URL = "https://tntqao5pj5eblmhvww7nd4byne.appsync-api.us-east-1.amazonaws.com/graphql"
}else if(process.env.REACT_APP_ENVIRONMENT === "production"){
    URL = "https://fy2cjmehurd6hdh2fj5wtyhk4u.appsync-api.us-east-1.amazonaws.com/graphql"
}

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
const apollo_client = new ApolloClient({
    //fetch,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default apollo_client;
