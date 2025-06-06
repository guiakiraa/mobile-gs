import React, { useState } from 'react';
import { ImageBackground, View, TextInput, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import styles from "../styles/styles";
import fundo from "../../assets/fundo6.png";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { pontoService } from '../services/api/pontoService';

export default function CadastrarPontoScreen() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');

    const buscarCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                setLogradouro(data.logradouro);
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    };

    const handleCadastrar = async () => {
        if (!nome || !tipo || !cep || !logradouro || !numero) {
            ToastAndroid.show('Preencha todos os campos', ToastAndroid.LONG);
            return;
        }

        try {
            await pontoService.createPonto({
                nome,
                tipo,
                cep,
                logradouro,
                numero
            });

            ToastAndroid.show('Ponto cadastrado com sucesso', ToastAndroid.LONG);
            navigation.goBack();
        } catch (error) {
            ToastAndroid.show('Erro ao cadastrar ponto', ToastAndroid.LONG);
        }
    };

    return (
        <ImageBackground source={fundo} style={styles.background}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity 
                        style={{
                            padding: 8,
                            borderRadius: 5,
                            backgroundColor: '#ff0000',
                            position: 'absolute',
                            top: 20,
                            left: 20,
                            zIndex: 1
                        }} 
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.form}>
                        <Text style={styles.welcome}>CADASTRAR PONTO</Text>
                        
                        <Text style={styles.label}>NOME</Text>
                        <TextInput
                            placeholder="Digite o nome do ponto"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}
                        />

                        <Text style={[styles.label, { marginTop: 20 }]}>TIPO</Text>
                        <TextInput
                            placeholder="Digite o tipo do ponto"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={tipo}
                            onChangeText={setTipo}
                        />

                        <Text style={[styles.label, { marginTop: 20 }]}>CEP</Text>
                        <TextInput
                            placeholder="Digite o CEP"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={cep}
                            onChangeText={(text) => {
                                setCep(text);
                                if (text.length === 8) {
                                    buscarCep(text);
                                }
                            }}
                            keyboardType="numeric"
                        />

                        <Text style={[styles.label, { marginTop: 20 }]}>LOGRADOURO</Text>
                        <TextInput
                            placeholder="Digite o logradouro"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={logradouro}
                            onChangeText={setLogradouro}
                        />

                        <Text style={[styles.label, { marginTop: 20 }]}>NÚMERO</Text>
                        <TextInput
                            placeholder="Digite o número"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={numero}
                            onChangeText={setNumero}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCadastrar}
                        >
                            <Text style={styles.buttonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}