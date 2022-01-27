import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import WorldStats from './WorldStats';
import Stack from './Stack'
import SecStack from './SecStack'
import CountryStats from './ContryStats'

const Drawer = createDrawerNavigator();

export default function Draw() {
  return (
    <NavigationContainer>
      <Drawer.Navigator >
        <Drawer.Screen name="WorldStats" component={WorldStats}  />
        <Drawer.Screen name="Countries" component={Stack}  />
        <Drawer.Screen name="Favorites" component={SecStack}  />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}