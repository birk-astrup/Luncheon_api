import {gql} from 'apollo-boost';

export default gql`
  query getUser($id: ID!) {
    user(_id: $id) {
      user {
        registered {
          _id
          timestamp
        }
      }
    }
  }
`;
