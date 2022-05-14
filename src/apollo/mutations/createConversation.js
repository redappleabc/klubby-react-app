import {gql} from "@apollo/client";

export default gql`
mutation createConversation{
    createConversation {
    createdAt,
    id
  }
}`;
