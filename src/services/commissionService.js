import { gql } from "@apollo/client";
import client from "../apollo-client";

export const Commissions = async (event) => {
  const { page, size } = event;
  const { data, error, loading } = await client.query({
    query: gql`
      query getCommissions($page: Int, $size: Int) {
        getCommissions(page: $page, size: $size) {
          nodes {
            _id
            amount
            description
            percentage
            company {
              _id
              address
              website
              email
              name
              contactPhoneNumber
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
  return { data, loading, error };
};

export const editCommission = async (event) => {
  const { amount, percentage, description, companyId, commissionId } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation updateCommission(
        $amount: String!
        $percentage: String!
        $description: String!
        $companyId: String!
        $commissionId: String!
      ) {
        updateCommission(
          amount: $amount
          percentage: $percentage
          description: $description
          companyId: $companyId
          commissionId: $commissionId
        ) {
          amount
        }
      }
    `,
    variables: {
      amount,
      percentage,
      description,
      commissionId,
      companyId,
    },
  });
  return { data, errors };
};

export const addCommission = async (event) => {
  const { amount, percentage, description, companyId } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation addCommission(
        $amount: String!
        $percentage: String!
        $description: String!
        $companyId: String!
      ) {
        addCommission(
          amount: $amount
          percentage: $percentage
          description: $description
          companyId: $companyId
        ) {
          _id
        }
      }
    `,
    variables: {
      amount,
      percentage,
      description,
      companyId,
    },
  });
  return { data, errors };
};

export const deleteCommission = async (commissionId) => {
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation deleteCommission($commissionId: String!) {
        deleteCommission(commissionId: $commissionId)
      }
    `,
    variables: {
      commissionId,
    },
  });
  return { data, errors };
};
