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
                tripType
                user{
                  _id
                  phoneNo
                  firstName
                  lastName
                  email
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
    console.log(errors, 'error');
    return {data, loading, errors}
  };

  export const createBooking = async(event) => {
    const {from, to, transporter, user, route, amount, departureDate, returningDate, seatNumbers, status, phone, email, bookingDate, billingId, passengerType,tripType, passengers,} = event
    const {data, errors} = await client.mutate({
      mutation: gql`
      mutation createBooking($from:String, $to:String, $transporter: String, $user:String, $route:String, $amount:String, $departureDate:String, $returningDate:String, $seatNumbers:Int, $status:String, $phone:String, $email:String, $bookingDate:String, $billingId:String, $passengerType: String, $tripType:String, $passengers: Passengers ) {
        createBooking(from:"62e7a1585b2487f64db7f71e", transporter:"62e7ba1d5b2487f64db7f738", user:"62c016aaaadaaa0ca64640c3", to:"62e7a1a45b2487f64db7f722", route:"62e82e160ad926f607a77349", amount:"1000", departureDate:"12 may", returningDate:"30 may", seatNumbers:10, status:"true", phone:"0908344", email:"e@gmail.com", bookingDate:"12 may", billingId:"234", tripType:"One Way", passengers:{name:"vics", gender:"male", age:"20"}, passengerType:"adult"){
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
          departureDetails{
            city
            location
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
//add routes
  // mutation{
  //   addRoute(name:"lagos-abuja", departureDate:"20 may", departureTime:"10 am", startLocation:"62e7a1585b2487f64db7f71e", endLocation:"62e7a1a45b2487f64db7f722", busId:"62e7a0135b2487f64db7f719"){
  //    _id
  //    from{
  //      _id
  //      city
  //    }
  //    to{
  //      _id
  //      city
  //    }
  //    price
  //    bus{
  //      _id
  //      vehicleNo
  //      availableSeats
  //      numberOfSeats
  //    }
  //  }
  //  }

  // mutation{
  //   createBooking(from:"62e7a1585b2487f64db7f71e", transporter:"62e7ba1d5b2487f64db7f738", user:"62c016aaaadaaa0ca64640c3", to:"62e7a1a45b2487f64db7f722", route:"62e82e160ad926f607a77349", amount:"1000", departureDate:"12 may", returningDate:"30 may", seatNumbers:10, status:"true", phone:"0908344", email:"e@gmail.com", bookingDate:"12 may", billingId:"234", passengerType:"adult", tripType:"One Way", passengers:{name:"Tayo", gender:"male", age:"20"}){
  //     _id
  //     from
  //     to
  //     route
  //   }
  // }
  