import {gql} from "@apollo/client";

export default gql`
  mutation editMessage($content: String!, $conversationId: ID!, $id: String!) {
    editMessage(id: $id, content: $content, conversationId: $conversationId){
      __typename
      conversationId
      createdAt
      updatedAt
      id
      sender
      content
      isSent
    }
  }
`;
