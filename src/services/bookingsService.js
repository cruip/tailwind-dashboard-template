import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllBookings = async (page = 1, size= 10) => {
    const { data, errors, loading } = await client.query({
        query: gql`
        query bookings($page: Int, $size: Int){
            getBookings(page: $page, size: $size){
              nodes{
                _id
                seatNumbers
                to
                from
                route
                amount
                status
                phone
                email
                bookingDate
                departureDate
                returningDate
                tripType
                user{
                  _id
                }
                passengers{
                  name
                  gender
                  age
                }
              }
              pageInfo{
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
        },
    });
    return {data, loading, errors}
  };

  export const createBooking = async(event) => {
    const {from, to, transporter, user, route, amount, departureDate, returningDate, seatNumbers, status, phone, email, bookingDate, billingId, passengerType,tripType, passengers} = event
    const {data, errors} = await client.mutate({
      mutation: gql`
      mutation createBooking($from:String!, $to:String, $transporter: String, $user:String, $route:String, $amount:String, $departureDate:String, $returningDate:String, $seatNumbers:[Int], $status:String, $phone:String, $email:String, $bookingDate:String, $billingId:String, $passengerType: String, $tripType:String, $passengers: [Passengers] ) {
        createBooking(from:$from, transporter:$transporter, user:$user, to:$to, route:$route, amount:$amount, departureDate:$departureDate, returningDate:$returningDate, seatNumbers:$seatNumbers, status:$status, phone:$phone, email:$email, bookingDate:$bookingDate, billingId:$billingId, tripType:$tripType, passengers:$passengers, passengerType:$passengerType){
          _id
          from
          to
          user{
            _id
            lastName
            firstName
            email
          }
          route
          passengers{
            gender
            age
            name
          }
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
        from, to, transporter, user, route, amount, departureDate, returningDate, seatNumbers, status, phone, email, bookingDate, billingId, passengerType,tripType, passengers
      }
    });
    return { data, errors}
  }

  export const cancelConfirmBooking = async (event) => {
    const { bookingId, status } = event;
    const { data, errors } = await client.mutate({
      mutation: gql`
      mutation cancelConfirm($bookingId: String!, $status: String!){
        updateBooking( status: $status, bookingId:$bookingId){
          status
        }
      }
      `,
      variables: {
        bookingId, status
      },
    });
    return {data, errors}
  };
  