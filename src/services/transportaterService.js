import { gql } from "@apollo/client";
import client from "../apollo-client";

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

export const getSingleTransport = gql`
query Transport($transporterId: String!) {
  getTransporter(transporterId: $transporterId) {
      _id
      name
      address
      logo
      status
      contactPhoneNumber
      website
      terminals{
        _id
        city
        cityCode
        latitude
        longitude
        locationName
        locationCode
      }
    }
  }
`

export const addTransport = gql`
mutation addTrans($name: String!, $address: String!, $logo: String!, $transporterId: String!, $status: String!, $contactPhoneNumber: String!, $email: String!, $website: String!, $terminals: [String] ){
  addTransporter(name: $name, address: $address, logo: $logo,transporterId:$transporterId, terminals: $terminals, status: $status, contactPhoneNumber: $contactPhoneNumber, email:$email, website:$website){
    _id
    name
    address
    logo
    terminals{
      latitude
    }
    status
    contactPhoneNumber
    website
  }
}
`
