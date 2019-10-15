import {gql} from 'apollo-boost';

export default gql`
  mutation registerForLunch($nickname: String!, $email: String!) {
    registerLunch(nickname: $nickname, email: $email) {
      user {
        registered
      }
    }
  }
`;
