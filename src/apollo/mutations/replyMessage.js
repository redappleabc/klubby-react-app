import {gql} from "@apollo/client";

export default gql`
  mutation replyMessage($content: String!, $conversationId: ID!, $originalId: ID!) {
    replyMessage(content: $content, conversationId: $conversationId, originalId: $originalId){
      __typename
      conversationId
      createdAt
      id
      sender
      content
      isSent
      originalId
      originalMessage{
        content
        createdAt
        sender
      }
    }
  }
`;
