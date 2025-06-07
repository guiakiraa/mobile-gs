import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MenuScreen from './src/screens/MenuScreen';
import CadastrarPontoScreen from './src/screens/CadastrarPontoScreen';
import ListarPontosScreen from './src/screens/ListarPontosScreen';
import EditarPontoScreen from './src/screens/EditarPontoScreen';
import CadastrarAjudaScreen from './src/screens/CadastrarAjudaScreen';
import { RootStackParamList } from './src/types/types';
import BuscarPontosScreen from './src/screens/BuscarPontosScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="CadastrarPonto" component={CadastrarPontoScreen} />
        <Stack.Screen name="ListarPontos" component={ListarPontosScreen} />
        <Stack.Screen name="EditarPonto" component={EditarPontoScreen} />
        <Stack.Screen name="CadastrarAjuda" component={CadastrarAjudaScreen} />
        <Stack.Screen name="BuscarPontos" component={BuscarPontosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
