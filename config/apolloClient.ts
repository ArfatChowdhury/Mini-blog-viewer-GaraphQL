import { InMemoryCache, ApolloClient, HttpLink, makeVar } from "@apollo/client";


const currentPage = makeVar(1)


const client = new ApolloClient({

    link: new HttpLink({
        uri: 'https://rickandmortyapi.com/graphql'
    }),
    cache: new InMemoryCache()
})

export default client