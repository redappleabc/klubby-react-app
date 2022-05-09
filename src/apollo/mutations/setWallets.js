import {gql} from "@apollo/client";

export default gql`mutation SetWallet ($username:String!, $wallets:String!) {
    updateUser(username:$username, wallets:$wallets)
    {
        wallets
    }
}`;