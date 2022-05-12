import {gql} from "@apollo/client";

export default gql`
subscription subscribeToNewUserConversationBridge($username: ID!) {
  subscribeToNewUserConversationBridge(username: $username) {
    __typename
    username
    conversationId
    associated
  }
}`;
