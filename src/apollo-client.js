import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  Observable,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { toast } from "react-toastify";
import { Logout } from "./utils/Utils";

const logout = () => {
  Logout();
  toast.error("token expired");
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};

const httpLink = createHttpLink({
  // uri: "https://api.dryvafrica.com/graphql",

  uri: "https://dev-api.dryvafrica.com/graphql",
});

// const authLink = setContext((_, {headers}) => {
//     return(
//         {
//             headers: {
//                 ...headers,
//                 'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
//             }
//         }
//     )
// })

const isAuthError = (statusCode) => [401, 403].includes(statusCode);

const authLink = new ApolloLink((operation, forward) => {
  // Set outgoing Authorization headers
  const setHeaders = () =>
    operation.setContext(({ store, headers, ...rest }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem("token");
      // return the headers to the context so httpLink can read them

      return {
        ...rest,
        store,
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

  setHeaders();

  return new Observable((obs) => {
    const subscriber = {
      next: obs.next.bind(obs),
      // Handle auth errors. Only network or runtime errors appear here.
      error: (error) => {
        if (isAuthError(error.statusCode)) {
          // Trigger an auth refresh.
          logout()
            .then(setHeaders)
            .then(() => forward(operation).subscribe(subscriber));
        } else {
          obs.error(error);
        }
      },
      complete: obs.complete.bind(obs),
    };

    forward(operation).subscribe(subscriber);
  });
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default client;
