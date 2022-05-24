import { gql } from "@apollo/client";
//$username:String!
export default gql`query getUserConversations { 
    getMe {
        username
        wallets
        conversations { 
          __typename
          conversationId
          username
          associated
          read
          conversation {
            id
            createdAt
            messages{
              messages {
                __typename
                id
                conversationId
                content
                createdAt
                updatedAt
                sender
                isSent
                originalId
                originalMessage{
                  content
                  createdAt
                  sender
                }
              }
              nextToken
            }
          }
          
        }
    }
}`;