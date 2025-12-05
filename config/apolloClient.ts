import { InMemoryCache, ApolloClient, HttpLink, makeVar } from "@apollo/client";


export const currentPageVar = makeVar(1)

const client = new ApolloClient({

    link: new HttpLink({
        uri: 'https://rickandmortyapi.com/graphql'
    }),
    cache: new InMemoryCache()
})

export default client