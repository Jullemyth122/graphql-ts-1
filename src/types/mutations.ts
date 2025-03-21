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


export const CREATE_COMMENT = gql`
    mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
            success
            message
            comment {
                id
                content
                createdAt
            }
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation DeleteComment($id: ID!) {
        deleteComment(id: $id) {
            success
            message
            comment {
                id
            }
        }
    }
`


export const UPDATE_COMMENT = gql`
    mutation UpdateComment($input: UpdateCommentInput!) {
        updateComment(input: $input) {
            success
            message   
            comment {
                id
                content
            }
        }
    }
`