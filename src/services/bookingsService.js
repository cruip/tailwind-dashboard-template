import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllBookings = async (page = 1, size= 10) => {
    const { data, error, loading } = await client.query({
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
    return {data, loading, error}
  };
  