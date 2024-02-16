import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllTransporterName = async (page = 1, size = 20) => {
    const { data, error, loading } = await client.query({
      query: gql`
        query transport($page: Int, $size: Int) {
          getTransporters(page: $page, size: $size) {
            pageInfo {
              pageSize
              totalItems
            }
            nodes {
              _id
              name
            }
          }
        }
      `,
      variables: {
        page,
        size,
      },
    });
    return { data, loading, error };
  };
