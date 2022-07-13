import gql from 'graphql-tag';

export default gql`
mutation createUserConversationBridge($conversationId: ID!, $username: ID!, $name: String, $accepted: Boolean) {
  createUserConversationBridge(conversationId: $conversationId, username: $username, name: $name, accepted: $accepted) {
    __typename
    username
    conversationId
    name
    accepted
  }
}
`;
