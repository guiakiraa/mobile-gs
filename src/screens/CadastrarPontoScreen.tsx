import React, { useState } from 'react';
import {
    ImageBackground,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ToastAndroid,
    ScrollView,
    StyleSheet
} from "react-native";
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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal={false}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.form}>
                        <Text style={styles.welcome}>Cadastrar Ponto de Distribuição</Text>

                        <TextInput
                            placeholder="Nome"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}
                        />

                        <TextInput
                            placeholder="Tipo"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            value={tipo}
                            onChangeText={setTipo}
                        />

                        <TextInput
                            placeholder="CEP"
                            placeholderTextColor="#ccc"
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

                        <TextInput
                            placeholder="Logradouro"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            value={logradouro}
                            onChangeText={setLogradouro}
                        />

                        <TextInput
                            placeholder="Número"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            value={numero}
                            onChangeText={setNumero}
                        />

                        <TouchableOpacity
                            style={styles.buttonPrimary}
                            onPress={handleCadastrar}
                        >
                            <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonSecondary}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.buttonText}>CANCELAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        justifyContent: 'center',
        paddingVertical: 60,
    },
    welcome: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#008b8b',
        color: '#fff',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        marginBottom: 16,
    },
    buttonPrimary: {
        backgroundColor: '#006666',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonSecondary: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
});
