import * as React from 'react';
import { AsyncStorage,Alert } from 'react-native';
import { ToggleButton } from 'react-native-paper';
export default function FavoriteButton({ item }) {
  const [status, setStatus] = React.useState('unchecked');
  const [list, setList] = React.useState('');
  const onButtonToggle = async () => {
    status === 'checked' ? Alert.alert('Removed from Favorites') : Alert.alert('added to Favorites')
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
    if(status === 'checked')  add() 
    else  remove();
  };
  React.useEffect(() => {
    load();
  },);
  const load = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@list:key');
      var parsed = JSON.parse(jsonValue)
      console.log(parsed)
      if(parsed!=undefined){
      setList(parsed)}
    } catch (e) {
      console.log(e);
    }
  };
  const add = async () => {
    try {
      setList(...list, item);
        await AsyncStorage.setItem('@list:key',JSON.stringify(list));
      } catch (error) {
      console.log(error);
    }
  };
  const remove = async () => {
    try {
      setList(list.filter((item) => !item));
      await AsyncStorage.setItem('@list:key', JSON.stringify(list));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ToggleButton
      icon="star"
      value={item}
      status={status}
      onPress={onButtonToggle}
    />
  );
}
