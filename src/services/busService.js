import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllBuses = async (page = 1, size = 10) => {
  const { data, errors, loading } = await client.query({
    query: gql`
      query buses($page: Int, $size: Int) {
        getBuses(page: $page, size: $size) {
          pageInfo {
            totalItems
            currentPage
          }
          nodes {
            _id
            class
            type
            route {
              _id
              name
              distance
              expectedTime
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
            }
            departureDate
            departureTime
            price
            busImage
            numberOfSeats
            availableSeats
            occupiedSeat
            departureTerminal
            arrivalTerminal
            status
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

export const addBus = async (event) => {
  const {
    type,
    route,
    clas,
    departureTime,
    departureDate,
    expectedArrival,
    numberOfSeats,
    availableSeats,
    occupiedSeat,
    companyId,
    busImage,
    price,
    departureTerminal,
    arrivalTerminal,
    hasAC,
    status,
  } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation busAdd(
        $clas: String
        $type: String
        $route: String
        $departureTime: String
        $departureDate: [Date]
        $expectedArrival: String
        $numberOfSeats: String
        $availableSeats: [String]
        $occupiedSeat: [String]
        $companyId: String!
        $busImage: String
        $price: String
        $departureTerminal: String
        $arrivalTerminal: String
        $hasAC: Boolean
        $status: Boolean
      ) {
        addBus(
          class: $clas
          type: $type
          route: $route
          departureTime: $departureTime
          departureDate: $departureDate
          expectedArrival: $expectedArrival
          numberOfSeats: $numberOfSeats
          availableSeats: $availableSeats
          occupiedSeat: $occupiedSeat
          companyId: $companyId
          price: $price
          departureTerminal: $departureTerminal
          arrivalTerminal: $arrivalTerminal
          hasAC: $hasAC
          busImage: $busImage
          status: $status
        ) {
          _id
        }
      }
    `,
    variables: {
      type,
      route,
      clas,
      departureTime,
      departureDate,
      expectedArrival,
      numberOfSeats,
      availableSeats,
      occupiedSeat,
      companyId,
      busImage,
      price,
      departureTerminal,
      arrivalTerminal,
      hasAC,
      status,
    },
  });
  return { data, errors };
};

export const addBusToRoute = async (event) => {
  const { busId, routeId } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation addBusRoute($busId: String!, $routeId: String!) {
        addBusToRoute(busId: $busId, routeId: $routeId) {
          _id
          name
        }
      }
    `,
    variables: {
      busId,
      routeId,
    },
  });
  return { data, errors };
};
