import {gql} from "@apollo/client";

export default gql`
  mutation removeMessage($conversationId:ID!, $id: String!) {
    removeMessage(conversationId:$conversationId, id: $id){
      __typename
      conversationId
      createdAt
      id
      sender
      content
      isSent
    }
  }
`;
