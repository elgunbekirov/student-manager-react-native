import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './src/store/store';
import HomePage from './src/screens/HomePage';
import StudentPage from './src/screens/StudentPage';
import UniversityPage from './src/screens/UniversityPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Students" component={StudentPage} />
          <Stack.Screen name="Universities" component={UniversityPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}