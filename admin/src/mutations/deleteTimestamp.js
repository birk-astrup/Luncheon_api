import {gql} from 'apollo-boost';

export default gql`
    mutation DeleteTimstamp($user_id: ID!, $timestamp_id: ID!) {
    deleteTimestamp(user_id: $user_id, timestamp_id: $timestamp_id) {
      status
      error {
        message
      }
    }
  }
`
