import {gql} from "@apollo/client";

export default gql`
subscription subscribeToRemovedMessage($conversationId: ID!) {
  subscribeToRemovedMessage(conversationId: $conversationId) {
    __typename
    conversationId
    createdAt
    id
    sender
    content
    isSent
  }
}`;
