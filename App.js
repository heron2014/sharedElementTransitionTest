import 'react-native-gesture-handler';
import React from 'react';
import { LogBox, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import SalonListDetails from './Screens/SalonListDetails';
import SalonList from './Screens/SalonList';

LogBox.ignoreAllLogs(true)


const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SalonList"
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: 'white' } }}
      >
        <Stack.Screen
          name="SalonList"
          component={SalonList}
          options={() => options}
        />
        <Stack.Screen
          name="SalonListDetails"
          component={SalonListDetails}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
