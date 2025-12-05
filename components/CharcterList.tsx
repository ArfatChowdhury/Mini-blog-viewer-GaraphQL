import { useQuery } from "@apollo/client/react";
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { GET_CHARACTERS_Pagination } from "../queries/characters";
import { useContext } from "react";
import ApolloContext from "../Context/apolloContext";


interface Character {
    id: string;
    name: string;
    image: string;
}

interface CharacterData {
    characters: {
        results: Character[]
        info: {
            pages: number;
            next: number | null;
            prev: number | null;
        }
    }
}

const CharacterList = () => {
    const { currentPage, setCurrentPage } = useContext(ApolloContext)


    const apiPage = Math.ceil(currentPage / 2)

    const { data, loading, error } = useQuery<CharacterData>(GET_CHARACTERS_Pagination, {
        variables: {
            page: apiPage
        }
    })

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>
    if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>

    const { pages, next, prev } = data?.characters.info || {}
    const allCharacters = data?.characters.results || []

    const isFirstHalf = currentPage % 2 !== 0
    const characters = isFirstHalf ? allCharacters.slice(0, 10) : allCharacters.slice(10, 20)

    const handleNextPage = () => {

        if (isFirstHalf || next) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Image style={styles.image} source={{ uri: item.image }} />
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={styles.pagination}>
                        <TouchableOpacity
                            onPress={handlePrevPage}
                            disabled={currentPage === 1}
                            style={[styles.button, currentPage === 1 && styles.disabled]}
                        >
                            <Text style={styles.buttonText}>Prev</Text>
                        </TouchableOpacity>

                        <Text style={styles.pageNumber}>{currentPage}</Text>

                        <TouchableOpacity
                            onPress={handleNextPage}
                            disabled={!isFirstHalf && !next}
                            style={[styles.button, (!isFirstHalf && !next) && styles.disabled]}
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        width: 200,
        height: 200,
    },
    item: {
        gap: 10,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 20,
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    disabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    pageNumber: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        color: 'white',
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        marginTop: 50,
    }
})

export default CharacterList;