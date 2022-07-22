import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: "http://ec2-54-80-92-162.compute-1.amazonaws.com:3000/graphql",
})

const authLink = setContext((_, {headers}) => {
    return(
        {
            headers: {
                ...headers,
                accessToken: localStorage.getItem('token') || ''
            }
        }
    )
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;