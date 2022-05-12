import {gql} from "@apollo/client";

export default gql`
  mutation setRead($conversationId: ID!, $username: ID!, $messageId: ID!) {
    setRead(conversationId: $conversationId, username: $username, messageId: $messageId){
      __typename
      conversationId
    }
  }
`;
