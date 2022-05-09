import {gql} from "@apollo/client";

export default gql`
query getConversationMessages($conversationId: ID!, $after: String, $first: Int) {
  getAllMessageConnection(conversationId: $conversationId, after: $after, first: $first) {
    __typename
    nextToken,
    messages {
      __typename
      id
      conversationId
      content
      createdAt
      sender
      isSent
    }
  }
}`;
