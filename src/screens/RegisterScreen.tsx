import { ImageBackground, View, TextInput, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import styles from "../styles/styles";
import fundo from "../../assets/fundo4.png";
import { useState } from "react";
import axios, { AxiosInstance } from 'axios';
import { NavigationProps } from '../types/types';
import { usuarioService } from '../services/api/usuarioService';

const APIKEY = process.env.EXPO_PUBLIC_APIKEY;

const apiLogin: AxiosInstance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
});

export default function RegisterScreen({ navigation }: NavigationProps) {
    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const KEY_SUFIX = `key=${APIKEY}`;

    const buscarCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                setCidade(data.localidade);
                setLogradouro(data.logradouro);
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    };

    const handleCreateAccount = async () => {
        if (!nome || !email || !password || !cep || !cidade || !logradouro || !numero) {
            ToastAndroid.show('Preencha todos os campos obrigatórios', ToastAndroid.LONG);
            return;
        }

        try {
            // Primeiro, criar o usuário no Firebase
            const path = `:signUp?${KEY_SUFIX}`;
            const firebaseResponse = await apiLogin.post(path, { 
                email, 
                password, 
                returnSecureToken: true 
            });

            // Depois, criar o usuário na nossa API
            const usuarioData = {
                nome,
                cep,
                cidade,
                logradouro,
                numero,
                complemento: complemento || ''
            };

            await usuarioService.createUsuario(usuarioData);

            ToastAndroid.show('Conta criada com sucesso! Agora faça login com suas credenciais.', ToastAndroid.LONG);
            navigation.replace('Menu');
        } catch (error: any) {
            console.error('Erro ao criar conta:', error);
            if (error.response?.data?.error?.message) {
                ToastAndroid.show(`Erro ao criar conta: ${error.response.data.error.message}`, ToastAndroid.LONG);
            } else {
                ToastAndroid.show('Erro ao criar conta. Tente novamente.', ToastAndroid.LONG);
            }
        }
    };

    return (
        <ImageBackground source={fundo} style={styles.background}>
            <ScrollView contentContainerStyle={localStyles.scrollContainer}>
                <View style={localStyles.container}>
                    <Text style={styles.welcome}>CRIAR CONTA</Text>
                    
                    <Text style={styles.label}>NOME</Text>
                    <TextInput
                        style={localStyles.input}
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={styles.label}>E-MAIL</Text>
                    <TextInput
                        style={localStyles.input}
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>SENHA</Text>
                    <TextInput
                        style={localStyles.input}
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    
                    <Text style={styles.label}>CEP</Text>
                    <TextInput
                        style={localStyles.input}
                        placeholder="Digite seu CEP"
                        value={cep}
                        onChangeText={(text) => {
                            setCep(text);
                            if (text.length === 8) {
                                buscarCep(text);
                            }
                        }}
                        keyboardType="numeric"
                        maxLength={8}
                    />

                    <Text style={styles.label}>CIDADE</Text>
                    <TextInput
                        style={localStyles.input}
                        placeholder="Cidade"
                        value={cidade}
                        editable={false}
                    />

                    <Text style={styles.label}>LOGRADOURO</Text>
                    <TextInput
                        style={localStyles.input}
                        placeholder="Logradouro"
                        value={logradouro}
                        editable={false}
                    />

                    <Text style={styles.label}>NÚMERO</Text>
                    <TextInput
                        style={localStyles.input}
                        placeholder="Digite o número"
                        value={numero}
                        onChangeText={setNumero}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>COMPLEMENTO</Text>
                    <TextInput
                        style={localStyles.input}
                        placeholder="Digite o complemento (opcional)"
                        value={complemento}
                        onChangeText={setComplemento}
                    />

                    <TouchableOpacity
                        style={[styles.button, { marginTop: 20, marginBottom: 30}]}
                        onPress={handleCreateAccount}
                    >
                        <Text style={styles.buttonText}>CRIAR CONTA</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 40,
    },
    container: {
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: '#028c8c', 
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});