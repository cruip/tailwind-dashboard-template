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
  const { paymentId, status, cancelationReason } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation approvePayment($paymentId: String!, $status: String!, cancelationReason: String!) {
        approvePayment(status: $status, paymentId: $paymentId, cancelationReason :$cancelationReason) {
          _id
        }
      }
    `,
    variables: {
      paymentId,
      status,
      cancelationReason,
    },
  });
  return { data, errors };
};
export const addPaymentMethod = async (event) => {
  const { canRefund, name, isEnabled } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation addPaymentMethod(
        $canRefund: Boolean
        $name: String!
        $isEnabled: Boolean
      ) {
        addPaymentMethod(
          canRefund: $canRefund
          name: $name
          isEnabled: $isEnabled
        ) {
          _id
        }
      }
    `,
    variables: {
      canRefund,
      name,
      isEnabled,
    },
  });
  return { data, errors };
};
export const getPaymentMethods = async (page, size) => {
  const { data, errors, loading } = await client.query({
    query: gql`
      query getPaymentMethods($page: Int, $size: Int) {
        getPaymentMethods(page: $page, size: $size) {
          pageInfo {
            totalItems
            currentPage
            pageSize
            hasNextPage
            hasPreviousPage
            nextPage
            previousPage
            lastPage
          }
          nodes {
            _id
            canRefund
            name
            isEnabled
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
