import { gql } from "@apollo/client";

export default gql`
subscription subscribeToAcceptConversation($conversationId: ID!) {
  subscribeToAcceptConversation(conversationId: $conversationId) {
    conversationId
    username
  }
}`;
