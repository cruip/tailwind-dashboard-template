import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllUsers = async(page = 1, size= 10) => {
    const {data, errors} = await client.query({
       query: gql`
       query users($page: Int, $size: Int){
        getUsers(page: $page, size: $size, filters:{column:"", operator:"", value:""}){
          pageInfo{
            pageSize
            lastPage
            nextPage
            currentPage
            totalItems
          }
          nodes{
            _id
            bookings{
              _id
              from
              to
              user{
                _id
                lastName
                firstName
                email
                phoneNo
              }
              route
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
       ` ,
       variables: {
        page,
        size,
    },
    })

    return {data, errors}
}

export const getSingleUsers = async(userId) => {
    const {data, errors} = await client.query({
       query: gql`
       query user($userId: String){
        getUser(userId: $userId){
            _id
            firstName
            lastName
            phoneNo
            email
            isEmailVerified
            imageUrl
            bookings{
              _id
              email
              billingId
              phone
              amount
              seatNumbers
              bookingDate
              departureDate
              to
              from
              route
              
            }
          }
      }
       ` ,
       variables: {
        userId
    },
    })

    return {data, errors}
}