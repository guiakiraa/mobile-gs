import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ToastAndroid, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios, { AxiosInstance } from 'axios';
import fundo from '../../assets/fundo.png';
import { NavigationProps } from '../types/types';

const APIKEY = process.env.EXPO_PUBLIC_APIKEY;

const apiLogin: AxiosInstance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
});

function LoginScreen(props: NavigationProps): React.ReactElement {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const KEY_SUFIX = `key=${APIKEY}`;

  return (
    <ImageBackground source={fundo} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.form}>
          {/* Título estilizado como "TRIA URBAN" */}
          <Text style={styles.logoTria}>TRIA</Text>
          <View style={styles.logoUrbanContainer}>
            <Text style={styles.logoUr}>UR</Text>
            <Text style={styles.logoBan}>BAN</Text>
          </View>

          <TextInput
            placeholder="E-MAIL"
            placeholderTextColor="#fff"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="SENHA"
            placeholderTextColor="#fff"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const path = `:signInWithPassword?${KEY_SUFIX}`;
              apiLogin
                .post(path, { email, password, returnSecureToken: true })
                .then(() => {
                  ToastAndroid.show('Usuário logado com sucesso', ToastAndroid.LONG);
                  navigation.replace('Menu');
                })
                .catch(() => {
                  ToastAndroid.show('Erro ao logar o usuário', ToastAndroid.LONG);
                });
            }}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.secondaryButtonText}>É MINHA PRIMEIRA VEZ NO APP!</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  form: {
    justifyContent: 'center',
  },
  logoTria: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
  },
  logoUrbanContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  logoUr: {
    color: '#5FC0AD',
    fontSize: 24,
    letterSpacing: 4,
  },
  logoBan: {
    color: '#fff',
    fontSize: 24,
    letterSpacing: 4,
  },
  input: {
    backgroundColor: '#5FC0AD',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#00B58C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  secondaryButtonText: {
    color: '#00B58C',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
