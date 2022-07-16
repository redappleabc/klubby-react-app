import {gql} from "@apollo/client";
  
export default gql`query getConversationById($conversationId:ID!) {
    getConversationById(conversationId:$conversationId)
    {
        id
        creator
        createdAt
    }
}`;