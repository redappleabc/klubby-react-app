import {gql} from "@apollo/client";
//$username:String!
export default gql`query getKlubsByKlubName($klubname:String!) {
    searchKlubs(klubname: $klubname)
    {
        klubname
        avatar {
            bucket
            key
            region
        }
        description
    }
}`;