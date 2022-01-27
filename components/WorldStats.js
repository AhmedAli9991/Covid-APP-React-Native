import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
// You can import from local files

export default function WorldStats() {
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);
  const [pop, setPop] = useState();

  useEffect(() => {
    getData();
    getpop();
  }, []);

  const getData = async () => {
    try {
      let response = await fetch(
        'https://covid-19-data.p.rapidapi.com/totals',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
            'x-rapidapi-key':
              '652f04450emsh0c59cc5091c6d1ap111330jsn52fc6e95515b',
          },
        }
      );
      let res = await response.json();
      setData(res);
      setLoad(true);
    } catch (error) {
      console.error(error);
    }
  };
  const getpop = async () => {
    try {
      let response = await fetch(
        'https://world-population.p.rapidapi.com/worldpopulation',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'world-population.p.rapidapi.com',
            'x-rapidapi-key':
              '652f04450emsh0c59cc5091c6d1ap111330jsn52fc6e95515b',
          },
        }
      );
      let res = await response.json();
      setPop(res.body.world_population);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    
    <View style={styles.container}>
      {load === false ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text
            style={[
              styles.paragraph,
              { backgroundColor: 'red', fontSize: 40, color: 'white' },
            ]}>
            COVID CASES
          </Text>
          <Text style={styles.paragraph}>
            Confirmed: {data[0].confirmed}{' '}
            {((data[0].confirmed / pop) * 100).toFixed(2)}%
          </Text>
          <Text style={styles.paragraph}>
            Recovered: {data[0].recovered}{' '}
            {((data[0].recovered / pop) * 100).toFixed(2)}%
          </Text>
          <Text style={styles.paragraph}>
            Critical: {data[0].critical}{' '}
            {((data[0].critical / pop) * 100).toFixed(3)}%
          </Text>
          <Text style={styles.paragraph}>
            Deaths: {data[0].deaths} {((data[0].deaths / pop) * 100).toFixed(2)}
            %
          </Text>
          <Text style={styles.paragraph}>
            LastUpdated: {data[0].lastUpdate.substring(0, data[0].lastUpdate.indexOf('T'))}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    backgroundColor: 'pink',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
