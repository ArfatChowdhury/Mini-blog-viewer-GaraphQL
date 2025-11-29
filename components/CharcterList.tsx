import { useQuery } from "@apollo/client/react";
import { FlatList, Text, View } from "react-native"
import { GET_CHARACTERS } from "../queries/characters";

interface CharcterListProps {
    characters: {
        id: string;
        name: string;
        image: string;
    }[];
}

interface CharcterData {
    characters: {
        results: CharcterListProps[]
    }
}

const CharcterList = () => {

    const { data } = useQuery<CharcterData>(GET_CHARACTERS)

    const characters = data?.characters.results


    return (
        <View style={styles.container}>
            <FlatList
                data={characters}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Image style={styles.image} source={{ uri: item.image }}

                        />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
    },
})