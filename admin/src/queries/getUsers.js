import {gql} from 'apollo-boost';

export default gql`
  query getUsers {
    getUsers {
      user {
        nickname
        email
      }
    }
  }
`;