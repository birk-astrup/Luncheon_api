import {gql} from 'apollo-boost';

export default gql`
  query getUsers {
    getUsers {
      user {
        _id
        nickname
        email
        registered {
          timestamp
          _id
        }
      }
    }
  }
`;