import { gql } from "@apollo/client";

export default gql`
subscription subscribeToReadMessage($conversationId: ID!) {
  subscribeToReadMessage(conversationId: $conversationId) {
    __typename
    username
    conversationId
    read
  }
}`;
