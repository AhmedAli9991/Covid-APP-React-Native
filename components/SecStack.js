import * as React from 'react';
import Favorites from './Favorites';
import ContryStats from './ContryStats';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
      <Stack.Navigator >
        <Stack.Screen
          name="Favorites"
          component={Favorites}  options={{headerShown: false}}
        />
        <Stack.Screen 
        name="CountryStats" 
        component={ContryStats}  options={{headerShown: false}}/>
      </Stack.Navigator>
  );
};
export default MyStack;