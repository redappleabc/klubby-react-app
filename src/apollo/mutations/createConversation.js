import {gql} from "@apollo/client";

export default gql`
mutation createConversation($createdAt: String, $id: ID!, $name: String!) {
    createConversation(createdAt: $createdAt, id: $id, name: $name) {
    createdAt,
    id,
    name
  }
}`;
