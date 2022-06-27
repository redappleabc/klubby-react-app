import {gql} from "@apollo/client";

export default gql`
  mutation createKlub($klubname: ID!, $avatar: S3ObjectInput, $description: String!,  $contractAddress: String!, $blockchainExplorer: String,
      $tokenType: String, $minimumAmountForMainGroup: String, $minimumAmountForWhaleGroup: String, $website: String,
      $coinmarketcap:String, $coingecho: String, $dextools: String, $telegram: String, $discord: String , $twitter: String, $reddit: String, $instagram: String)  {
    createKlub(klubname: $klubname, avatar: $avatar, description: $description,  contractAddress: $contractAddress, blockchainExplorer: $blockchainExplorer,
      tokenType: $tokenType, minimumAmountForMainGroup: $minimumAmountForMainGroup, minimumAmountForWhaleGroup: $minimumAmountForWhaleGroup, website: $website,
      coinmarketcap:$coinmarketcap, coingecho:$coingecho , dextools: $dextools, telegram: $telegram, discord: $discord , twitter: $twitter, reddit: $reddit, instagram: $instagram) {
      website
      description
      avatar{
        bucket,
        region,
        key
      }
      coinmarketcap
      coingecho
      dextools
      telegram
      discord
      twitter
      reddit
      instagram
      minimumAmountForMainGroup
      minimumAmountForWhaleGroup
      createdAt
      contractAddress
      klubname
      owner
      tokenType
      blockchainExplorer
    }
  }
`;
