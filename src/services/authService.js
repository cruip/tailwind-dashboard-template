import { gql } from "@apollo/client";
import client from "../apollo-client";

export const Auth = async (event) => {
  const { email, password } = event;
  const { data, errors } = await client.query({
      query: gql`
       query login($email: String!, $password: String!) {
         authenticate(email: $email, password: $password) {
           user {
             firstName
             lastName
             _id
           }
           token {
             accessToken
             refreshToken
           }
         }
       }
     `,
      variables: {
          email,
          password,
      },
  });
  return { data, errors}
};