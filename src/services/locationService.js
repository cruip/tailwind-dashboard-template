import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllLocations = async (page = 1, size = 10000) => {
  const { data, errors, loading } = await client.query({
    query: gql`
      query locations($page: Int, $size: Int) {
        getLocations(page: $page, size: $size) {
          pageInfo {
            totalItems
          }
          nodes {
            _id
            latitude
            longitude
            locationName
            city
          }
        }
      }
    `,
    variables: {
      page,
      size,
    },
  });
  return { data, loading, errors };
};

export const getTerminals = async (page = 1, size = 10000) => {
  const { data, errors, loading } = await client.query({
    query: gql`
      query getTerminals($page: Int, $size: Int) {
        getTerminals(page: $page, size: $size) {
          pageInfo {
            totalItems
          }
          nodes {
            _id
            latitude
            longitude
            locationName
            city
            address
            locationCode
          }
        }
      }
    `,
    variables: {
      page,
      size,
    },
  });
  return { data, loading, errors };
};

export const createTerminal = async (event) => {
  const {
    locationName,
    locationCode,
    address,
    city,
    streetAddress,
    cityCode,
    stateCode,
    longitude,
    latitude,
  } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation addTerminal(
        $locationCode: String
        $locationName: String!
        $address: String
        $city: String!
        $streetAddress: String
        $cityCode: String
        $stateCode: String
        $longitude: String
        $latitude: String
      ) {
        addTerminal(
          locationName: $locationName
          locationCode: $locationCode
          address: $address
          city: $city
          streetAddress: $streetAddress
          cityCode: $cityCode
          stateCode: $stateCode
          longitude: $longitude
          latitude: $latitude
        ) {
          _id
        }
      }
    `,
    variables: {
      locationName,
      locationCode,
      address,
      city,
      streetAddress,
      cityCode,
      stateCode,
      longitude,
      latitude,
    },
  });
  return { data, errors };
};

export const updateTerminal = async (event) => {
  const {
    terminalId,
    locationName,
    locationCode,
    address,
    city,
    streetAddress,
    cityCode,
    stateCode,
    longitude,
    latitude,
  } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation updateTerminal(
        $terminalId: String!
        $locationCode: String
        $locationName: String!
        $address: String
        $city: String!
        $streetAddress: String
        $cityCode: String
        $stateCode: String
        $longitude: String
        $latitude: String
      ) {
        updateTerminal(
          terminalId: $terminalId
          locationName: $locationName
          locationCode: $locationCode
          address: $address
          city: $city
          streetAddress: $streetAddress
          cityCode: $cityCode
          stateCode: $stateCode
          longitude: $longitude
          latitude: $latitude
        ) {
          _id
        }
      }
    `,
    variables: {
      terminalId,
      locationName,
      locationCode,
      address,
      city,
      streetAddress,
      cityCode,
      stateCode,
      longitude,
      latitude,
    },
  });
  return { data, errors };
};

export const deleteTerminal = async (terminalId) => {
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation deleteTerminal($terminalId: String!) {
        deleteTerminal(terminalId: $terminalId)
      }
    `,
    variables: {
      terminalId,
    },
  });
  return { data, errors };
};
