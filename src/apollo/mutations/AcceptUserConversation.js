import {gql} from "@apollo/client";

export default gql`
  mutation acceptConversation($conversationId: ID!) {
    acceptConversation(conversationId: $conversationId) {
        conversationId
    }
  }
`;
