import gql from 'graphql-tag';

export default gql`
mutation createUserConversationBridge($conversationId: ID!, $username: ID!) {
  createUserConversationBridge(conversationId: $conversationId, username: $username) {
    __typename
    username
    conversationId
    conversation {
      __typename
      id
      name
    }
    associated
  }
}
`;
