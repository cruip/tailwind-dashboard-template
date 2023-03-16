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
            vehicleNo
            vehicleModel
            vehicleBrand
            busImage
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
    vehicleNo,
    vehicleModel,
    vehicleBrand,
    numberOfSeats,
    transporter,
    busImage,
    status,
  } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation busAdd(
        $vehicleNo: String!
        $vehicleModel: String
        $vehicleBrand: String
        $numberOfSeats: String
        $transporter: String
        $busImage: String
        $status: Boolean
      ) {
        addBus(
          vehicleNo: $vehicleNo
          vehicleModel: $vehicleModel
          vehicleBrand: $vehicleBrand
          numberOfSeats: $numberOfSeats
          transporter: $transporter
          busImage: $busImage
          status: $status
        ) {
          _id
          vehicleNo
        }
      }
    `,
    variables: {
      vehicleNo,
      vehicleModel,
      vehicleBrand,
      numberOfSeats,
      transporter,
      busImage,
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
