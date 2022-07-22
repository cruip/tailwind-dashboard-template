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

//testing

export const GET_TRIP = gql`
query{
    getTrips(page:1, size:10, filters:{from:"62a339ece4a9c964b480c8a9",to:"62a339ece4a9c964b480c8a9",date:"2022-06-10T12:32:44.994+00:00"}){
      pageInfo{
        totalItems
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        previousPage
        lastPage
        
      }
      nodes{
        _id
        name
        from{
          locationName
          locationCode
          address
        }
        to{
          _id
          locationName
          locationCode
          address
        }
        bus{
          _id
          vehicleNo
          vehicleModel
          vehicleBrand
          numberOfSeats
        }
      }
    }
  }
`