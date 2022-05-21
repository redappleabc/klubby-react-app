import {gql} from "@apollo/client";

export default gql`
  mutation createMessage($content: String!, $conversationId: ID!) {
    createMessage(content: $content, conversationId: $conversationId){
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
