// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateCardScreen from './src/telas/CreateCardScreen';
import RecordsScreen from './src/telas/RecordsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateCardScreen">
        <Stack.Screen name="CreateCardScreen" component={CreateCardScreen} options={{ title: 'Criar Card' }} />
        <Stack.Screen name="RecordsScreen" component={RecordsScreen} options={{ title: 'Registros' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
