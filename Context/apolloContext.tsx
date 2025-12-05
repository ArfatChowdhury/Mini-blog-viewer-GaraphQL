import { useReactiveVar } from "@apollo/client/react";
import { createContext, ReactNode } from "react";
import { currentPageVar } from "../config/apolloClient";

interface ApolloContextType {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const ApolloContext = createContext<ApolloContextType>({
    currentPage: 1,
    setCurrentPage: () => { },
});

export const ApolloProvider = ({ children }: { children: ReactNode | undefined }) => {

    const currentPage = useReactiveVar(currentPageVar)

    const setCurrentPage = (page: number) => {
        currentPageVar(page)
    }
    return (
        <ApolloContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </ApolloContext.Provider>
    );
}

export default ApolloContext;
