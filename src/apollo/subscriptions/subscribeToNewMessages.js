import { gql } from "@apollo/client";

export default gql`
subscription subscribeToNewMessage($conversationId: ID!) {
  subscribeToNewMessage(conversationId: $conversationId) {
    __typename
    conversationId
    createdAt
    updatedAt
    id
    sender
    content
    isSent
    originalId
    originalMessage {
      content
      createdAt
      sender
    }
  }
}`;
