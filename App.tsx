import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import client from './config/apolloClient';
import CharacterList from './components/CharcterList';
import { ApolloProvider as PaginationProvider } from './Context/apolloContext';

export default function App() {
  return (
    <ApolloClientProvider client={client}>
      <PaginationProvider>
        <View style={styles.container}>
          <CharacterList />
          <StatusBar style="auto" />
        </View>
      </PaginationProvider>
    </ApolloClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
