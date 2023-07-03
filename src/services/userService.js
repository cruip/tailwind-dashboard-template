import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllUsers = async (event) => {
  const { page, size } = event;
  const { data, errors } = await client.query({
    query: gql`
      query users($page: Int, $size: Int) {
        getUsers(
          page: $page
          size: $size
          filters: { column: "", operator: "", value: "" }
        ) {
          pageInfo {
            pageSize
            lastPage
            nextPage
            currentPage
            totalItems
          }
          nodes {
            _id
            bookings {
              _id
              from {
                _id
                city
                locationName
                address
              }
              to {
                _id
                locationName
                address
                city
              }
              user {
                _id
                lastName
                firstName
                email
                phoneNo
              }
            }
            firstName
            lastName
            phoneNo
            email
            isEmailVerified
            userType
            imageUrl
          }
        }
      }
    `,
    variables: {
      page,
      size,
    },
  });

  return { data, errors };
};

export const getSingleUsers = async (userId) => {
  const { data, errors } = await client.query({
    query: gql`
      query user($userId: String) {
        getUser(userId: $userId) {
          _id
          firstName
          lastName
          phoneNo
          email
          isEmailVerified
          imageUrl
          bookings {
            _id
            amount
            status
            email
            phone
            datePaid
            dateCancelled
            bookingNo
            referenceId
            seatNumbers
            busId
            from {
              locationName
              address
              city
            }
            to {
              locationName
              address
              city
            }
            passengers {
              firstName
              lastName
              gender
              age
            }
          }
        }
      }
    `,
    variables: {
      userId,
    },
  });

  return { data, errors };
};

export const deleteUser = async (userId) => {
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation deleteUser($userId: String!) {
        deleteUser(userId: $userId)
      }
    `,
    variables: {
      userId,
    },
  });
  return { data, errors };
};
