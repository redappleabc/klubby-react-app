import {gql} from "@apollo/client";
//$username:String!
export default gql`query getUsersByUserName {
    getAllUsers
    {
        username
    }
}`;