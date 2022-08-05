import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllRoutes = async (page = 1, size= 10) => {
    const { data, errors, loading } = await client.query({
        query: gql`
        query routes($page: Int, $size: Int){
            getRoutes(page: $page, size: $size){
                pageInfo{
                    totalItems
                    currentPage
                  }
                  nodes{
                    _id
                    name
                    from{
                      _id
                      city
                      locationName
                      address
                    }
                    to{
                      _id
                      locationName
                      address
                      city
                    }
                    price
                    date
                    departureTime
                    bus{
                      _id
                      numberOfSeats
                      availableSeats
                      transporter{
                        _id
                        name
                        address
                        contactPhoneNumber
                      }
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
    return {data, loading, errors}
  };