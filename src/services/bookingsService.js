import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllBookings = async (page = 1, size= 10) => {
    const { data, errors, loading } = await client.query({
        query: gql`
        query bookings($page: Int, $size: Int){
            getBookings(page: $page, size: $size){
                pageInfo{
                  pageSize
                  totalItems
                  lastPage
                }
                nodes{
                  _id
                  phone
                  amount
                  passengers{
                    name
                    gender
                    age
                  }
                  passengerType
                  tripType
                  route
                  status
                  seatNumbers
                  referenceId
                  bookingDate
                  billingId
                  user{
                    _id
                    firstName
                    lastName
                    phoneNo
                    email
                    bookings{
                      _id
                    }
                  }
                  from
                  to
                  departureDetails{
                    city
                    location
                    time
                    date
                  }
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

  export const createBooking = async() => {
    const {data, errors} = await client.mutate({
      mutation: gql`
      mutation createBooking() {
        createBooking(from:"lagos", to:"ibadan", user:"Vics", route:"Lagos",departureDate:"may 10", returningDate:"23 june", amount:"10000", seatNumbers:3, status:"true", referenceId:"", phone:"123", email:"g@g.com", bookingDate:"20 dec", passengers:{name:"vics",gender:"male",age:"10" }, departureDetails:{city:"lagos",location:"ojo",time:"12 am", date:"12 may"}, bookingType:"one", tripType:"One Way"){
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
      `
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
  