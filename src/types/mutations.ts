import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
        createAccount(input: $input) {
            success
            message
            account {
                id
                username
                email
            }
        }
    }
`;

export const DELETE_ACCOUNT = gql`
    mutation DeleteAccount($id: ID!) {
        deleteAccount(id: $id) {
            success
            message
            account {
                id
                username
                email
            }
        }
    }
`;

export const UPDATE_ACCOUNT = gql`
    mutation UpdateAccount($input: UpdateAccountInput!) {
        updateAccount(input: $input) {
            success
            message
            account {
                id
                username
                email
            }
        }
    }
`;