import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllBookings = async (event) => {
  const { page, size, filters } = event;
  const { data, errors, loading } = await client.query({
    query: gql`
      query bookings($page: Int, $size: Int, $filters: BookingFilter!) {
        getBookings(page: $page, size: $size, filters: $filters) {
          nodes {
            _id
            seatNumbers
            bookingNo
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
            amount
            phone
            email
            bookingDate
            departureDate
            returningDate
            tripType
            paymentStatus
            status
            passengers {
              firstName
              lastName
              gender
              age
            }
          }
          pageInfo {
            lastPage
            currentPage
            totalItems
          }
        }
      }
    `,
    variables: {
      page,
      size,
      filters,
    },
  });
  return { data, loading, errors };
};

export const createBooking = async (event) => {
  const {
    from,
    to,
    transporter,
    user,
    busId,
    amount,
    departureDate,
    returningDate,
    seatNumbers,
    status,
    phone,
    email,
    bookingDate,
    passengerType,
    tripType,
    passengers,
  } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation createBooking(
        $from: String!
        $to: String
        $transporter: String
        $user: String
        $busId: String
        $amount: String
        $departureDate: String
        $returningDate: String
        $seatNumbers: [Int]
        $status: String
        $phone: String
        $email: String
        $bookingDate: String
        $passengerType: String
        $tripType: String
        $passengers: [Passengers]
      ) {
        createBooking(
          from: $from
          transporter: $transporter
          user: $user
          to: $to
          busId: $busId
          amount: $amount
          departureDate: $departureDate
          returningDate: $returningDate
          seatNumbers: $seatNumbers
          status: $status
          phone: $phone
          email: $email
          bookingDate: $bookingDate
          tripType: $tripType
          passengers: $passengers
          passengerType: $passengerType
        ) {
          amount
          seatNumbers
          phone
          email
          bookingDate
          departureDate
          returningDate
          tripType
        }
      }
    `,
    variables: {
      from,
      to,
      transporter,
      user,
      busId,
      amount,
      departureDate,
      returningDate,
      seatNumbers,
      status,
      phone,
      email,
      bookingDate,
      passengerType,
      tripType,
      passengers,
    },
  });
  return { data, errors };
};

export const cancelConfirmBooking = async (event) => {
  const { bookingId, status } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation cancelConfirm($bookingId: String!, $status: String!) {
        updateBooking(status: $status, bookingId: $bookingId) {
          _id
        }
      }
    `,
    variables: {
      bookingId,
      status,
    },
  });
  return { data, errors };
};

export const getBooking = async (bookingId) => {
  const { data, errors, loading } = await client.query({
    query: gql`
      query getBooking($bookingId: String) {
        getBooking(bookingId: $bookingId) {
          _id
          amount
          status
          email
          phone
          datePaid
          dateCancelled
          bookingNo
          departureDate
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
            documents{
              documentType
              number
              issuanceDate
              expiryDate
              issuanceCountry
              dateOfBirth
              nationality
            }
          }
        }
      }
    `,
    variables: {
      bookingId,
    },
  });
  return { data, errors, loading };
};

export const getAllTrips = async (event) => {
  const { filters, page, size } = event;
  const { data, errors, loading } = await client.query({
    query: gql`
      query trips($page: Int, $size: Int, $filters: TripFilter!) {
        getTrips(page: $page, size: $size, filters: $filters) {
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
            hasAC
            companyId {
              _id
              name
            }
          }
        }
      }
    `,
    variables: {
      page,
      size,
      filters,
    },
  });
  return { data, loading, errors };
};

export const getBookingStat = async (_ = "") => {
  const { data, errors, loading } = await client.query({
    query: gql`
      query bookStat($_: String) {
        getBookingStatistics(_: $_) {
          _id
          todayTotal
          weekTotal
          monthTotal
          totalAmountToday
          totalAmountWeekly
          totalAmountYearly
          totalAmountMonthly
        }
      }
    `,
    variables: {
      _,
    },
  });
  return { data, loading, errors };
};
export const toggleBookingStatus = async (event) => {
  const { bookingId, status, cancellationReason } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation toggleBookingStatus(
        $bookingId: String!
        $status: String!
        $cancellationReason: String
      ) {
        toggleBookingStatus(
          status: $status
          bookingId: $bookingId
          cancellationReason: $cancellationReason
        ) {
          _id
        }
      }
    `,
    variables: {
      bookingId,
      status,
      cancellationReason,
    },
  });
  return { data, errors };
};
