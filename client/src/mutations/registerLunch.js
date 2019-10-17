import {gql} from 'apollo-boost';

export default gql`
  mutation registerForLunch($id: ID!, $nickname: String!, $email: String!) {
    registerLunch(_id: $id, nickname: $nickname, email: $email) {
      user {
        registered {
          _id
        }
      }
    }
  }
`;
