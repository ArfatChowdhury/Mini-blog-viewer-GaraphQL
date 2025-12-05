import { gql } from "@apollo/client";




export const GET_CHARACTERS_Pagination = gql`

query GetCharacters{
characters{
    info{
        pages
        next
        prev
    }
    results{
        id
        name
        image
    }
}
}

`
