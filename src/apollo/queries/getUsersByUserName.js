import {gql} from "@apollo/client";
//$username:String!
export default gql`query getUsersByUserName($username:String!) {
    searchUsers(username: $username)
    {
        username
    }
}`;