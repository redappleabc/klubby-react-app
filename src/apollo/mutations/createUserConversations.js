import gql from 'graphql-tag';

export default gql`
mutation createUserConversationBridge($conversationId: ID!, $username: ID!, $name: String) {
  createUserConversationBridge(conversationId: $conversationId, username: $username, name: $name) {
    __typename
    username
    conversationId
    name
  }
}
`;
