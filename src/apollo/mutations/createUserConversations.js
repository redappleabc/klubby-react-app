import gql from 'graphql-tag';

export default gql`
mutation createUserConversations($conversationId: ID!, $username: ID!) {
  createUserConversations(conversationId: $conversationId, username: $username) {
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
