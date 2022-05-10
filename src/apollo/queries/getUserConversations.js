import {gql} from "@apollo/client";
//$username:String!
export default gql`query getUserConversations { 
    getMe {
        username
        wallets
        conversations {
          nextToken
          userConversations {
            __typename
            conversationId
            username
            associated
            #conversation {
            #  id
            #  name
            #  createdAt
            #}
          }
        }
    }
}`;