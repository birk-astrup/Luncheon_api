import {gql} from 'apollo-boost';

export default gql`
  query getUser($nickname: String!, $email: String!) {
    user(nickname: $nickname, email: $email) {
      user {
        registered
      }
    }
  }
`;
