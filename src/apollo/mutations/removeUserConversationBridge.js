import gql from 'graphql-tag';

export default gql`
mutation removeUserConversationBridge($conversationId: ID!, $username: ID!) {
  removeUserConversationBridge(conversationId: $conversationId, username: $username) {
    __typename
    username
    conversationId
    name
  }
}
`;