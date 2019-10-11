import {gql} from 'apollo-boost';

export default gql`
  {
    getUsers {
      user {
        nickname
        email
      }
    }
  }
`;
