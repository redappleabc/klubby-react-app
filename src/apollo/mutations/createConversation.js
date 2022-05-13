import {gql} from "@apollo/client";

export default gql`
mutation createConversation($createdAt: String, $id: ID!) {
    createConversation(createdAt: $createdAt, id: $id) {
    createdAt,
    id
  }
}`;
