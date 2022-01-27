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
import FavoriteButton from './FavoriteButton'
// You can import from local files

export default function Countries({navigation}) {
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
   try{
    let response=await fetch("https://world-population.p.rapidapi.com/allcountriesname", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "world-population.p.rapidapi.com",
		"x-rapidapi-key": "652f04450emsh0c59cc5091c6d1ap111330jsn52fc6e95515b"
	  }
    })
  let res =await response.json()
  setData(res.body.countries)
  setLoad(true)
    }
  catch(err){
        console.error(err);
      }
  };

  return (
    <View style={styles.container}>
          
      {load === false ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
  
  <FlatList
  data={data}
  keyExtractor={( index) => index.toString()}
  renderItem={({ item }) => (
          <TouchableOpacity   onPress={() => navigation.navigate('CountryStats', { item })}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderColor: 'grey',
              }}>
              <Text style={styles.paragraph}>{item}</Text>
              <FavoriteButton item={item} />
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
