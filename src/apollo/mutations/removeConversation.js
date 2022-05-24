import {gql} from "@apollo/client";

export default gql`
  mutation removeConversation($conversationId:ID!) {
    removeConversation(conversationId:$conversationId){
      __typename
      createdAt
      id
    }
  }
`;
