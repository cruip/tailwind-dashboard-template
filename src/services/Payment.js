import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getPaymentsHistory = async (page, size) => {
  const { data, error, loading } = await client.query({
    query: gql`
      query getPayments($page: Int, $size: Int) {
        getPayments(page: $page, size: $size) {
          pageInfo {
            pageSize
            totalItems
            currentPage
            hasNextPage
            hasPreviousPage
            nextPage
            previousPage
            lastPage
          }
          nodes {
            _id
            amount
            captureErrorCode
            captureErrorMessage
            paymentMetaData {
              email
              accountNumber
              bankName
            }
            method
            bookingNo
            status
            isCaptured
            transactionId
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
export const getPaymentById = async (paymentId) => {
  const { data, error, loading } = await client.query({
    query: gql`
      query getPayment($paymentId: String) {
        getPayment(paymentId: $paymentId) {
          pageInfo {
            pageSize
            totalItems
            currentPage
            hasNextPage
            hasPreviousPage
            nextPage
            previousPage
            lastPage
          }
          nodes {
            _id
            amount
            captureErrorCode
            captureErrorMessage
            paymentMetaData {
              email
              accountNumber
              bankName
            }
            method
            bookingNo
            status
            isCaptured
            transactionId
          }
        }
      }
    `,
    variables: {
      paymentId,
    },
  });
  return { data, loading, error };
};

export const approveManualPayment = async (event) => {
  const { paymentId, status } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation approvePayment($paymentId: String!, $status: String!) {
        approvePayment(status: $status, paymentId: $paymentId) {
          _id
        }
      }
    `,
    variables: {
      paymentId,
      status,
    },
  });
  return { data, errors };
};
