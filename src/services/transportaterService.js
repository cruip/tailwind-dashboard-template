import { gql } from "@apollo/client";

export const getAllTransporter = gql`
query{
  getTransporters(page: 1, size: 10){
    pageInfo{
      pageSize
      lastPage
      totalItems
      nextPage
      hasNextPage
      hasPreviousPage
    }
    nodes{
      _id
      address
      name
      terminals{
        _id
        address
        streetAddress
        latitude
        longitude
        locationName
        locationCode
      }
      contactPhoneNumber
      status
      website
    }
  }
 }
`