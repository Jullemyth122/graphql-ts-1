import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      username
      email
    }
  }
`;

export const GET_ACCOUNT = gql`
    query GetAccount($id: ID!) {
        account(id: $id) {
            id
            username
            email
        }
    }
`;

export const GET_COMMENTS = gql`
  query GetComments($accountId: ID!) {
    comments(accountId: $accountId) {
      id
      content
      createdAt
    }
  }
`;
