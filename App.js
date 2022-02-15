import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import getWeb3 from "./getWeb3";

export default async function App() {
  const web3 = await getWeb3();

  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.net.getId();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! JUDSON</Text>
      <StatusBar style="auto" />
    </View>
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
