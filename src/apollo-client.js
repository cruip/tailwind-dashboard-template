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
                // 'x-access-token': `Bearer ${localStorage.getItem('token')}` || '',
                'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
            }
        }
    )
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;

// {
//     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzdXBwb3J0QGpleHRhLmlvIiwiaXNzIjoiamV4dGEtY2VudHJhbCIsImlhdCI6MTY1OTAwNzcxNSwiZXhwIjoxNjU5MDA5NTE1LCJzdWIiOiI2MmQ5MTk5MGI1YWZjNjU0Y2ZmZjY4NTUiLCJyb2xlIjoiYWRtaW4iLCJqd3RpZCI6IjN6NFJlY2Z2dGtKWndWMncifQ.F6VKwg5RRNfI9JwcsZFyurHYjUbfynSk7XHnxW2h0H4"
//   }