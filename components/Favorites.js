import * as React from 'react';
import { AsyncStorage } from 'react-native';
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
export default function Favorites({navigation}){
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@list:key')
    jsonValue != null ? setData(JSON.parse(jsonValue)) : null
    setLoad(true)
  } catch(e) {
   console.log(e)
  }
}
  return (
 <View style={styles.container}>
          
      {load === false ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
  
  <FlatList
  data={data}
  renderItem={({ item,status }) => (
          <TouchableOpacity   onPress={() => navigation.navigate('CountryStats', { item })}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderColor: 'grey',
              }}>
              <Text style={styles.paragraph}>{item}</Text>
              <FavoriteButton item={item}/>
              </View>
              </TouchableOpacity>
  )}

  />
         
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
    padding: 8,
  },
  paragraph: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
