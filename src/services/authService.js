import { gql } from "@apollo/client";

export const GET_LOGIN = gql`
query login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      user {
        firstName
        lastName
      }
      token {
        accessToken
        refreshToken
      }
    }
  }
`;
