import {gql} from "@apollo/client";

export default gql`
query getConversationMessages($conversationId: ID!, $after: String, $first: Int) {
  getAllMessageConnections(conversationId: $conversationId, after: $after, first: $first) {
    __typename
    nextToken,
    messages {
      __typename
      id
      conversationId
      content
      createdAt
      updatedAt
      sender
      isSent
    }
  }
}`;
