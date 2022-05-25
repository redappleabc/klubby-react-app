import {gql} from "@apollo/client";

export default gql`
subscription subscribeToRemovedUserConversationBridge($username: ID!) {
  subscribeToRemovedUserConversationBridge(username: $username) {
    __typename
    username
    name
    conversationId
    associated{
      username
      read
    }
  }
}`;
