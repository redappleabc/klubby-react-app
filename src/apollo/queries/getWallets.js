import {gql} from "@apollo/client";
  
export default gql`query getUserWallets($username:String!) {
    getUserWallets(username:$username)
    {
        wallets
    }
}`;