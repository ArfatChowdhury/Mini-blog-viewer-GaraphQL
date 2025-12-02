import { ApolloProvider } from '@apollo/client/react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import client from './config/apolloClient';
import CharacterList from './components/CharcterList';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <CharacterList />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
