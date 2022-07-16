import {gql} from "@apollo/client";

export default gql`
  mutation acceptConversation($conversationId: ID!, $username: ID!) {
    acceptConversation(conversationId: $conversationId, username: $username) {
        conversationId
        username
    }
  }
`;
