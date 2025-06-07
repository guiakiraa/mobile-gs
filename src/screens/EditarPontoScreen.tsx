import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ToastAndroid, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import fundo from '../../assets/fundo6.png';
import { pontoService } from '../services/api/pontoService';
import { PontoDistribuicao } from '../types/types';
import { Feather } from '@expo/vector-icons';

type RouteParams = {
    ponto: PontoDistribuicao;
};

export default function EditarPontoScreen() {
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const navigation = useNavigation();
    const ponto = route.params?.ponto;

    if (!ponto || !ponto.id) {
        navigation.goBack();
        return null;
    }

    const [nome, setNome] = useState(ponto.nome);
    const [tipo, setTipo] = useState(ponto.tipo);
    const [cep, setCep] = useState(ponto.cep);
    const [logradouro, setLogradouro] = useState(ponto.logradouro);
    const [numero, setNumero] = useState(ponto.numero);

    const handleSalvar = async () => {
        if (!nome || !tipo || !cep || !logradouro || !numero) {
            ToastAndroid.show('Preencha todos os campos', ToastAndroid.LONG);
            return;
        }

        try {
            const pontoAtualizado: PontoDistribuicao = {
                id: ponto.id,
                nome,
                tipo,
                cep,
                logradouro,
                numero
            };

            await pontoService.updatePonto(ponto.id, pontoAtualizado);
            ToastAndroid.show('Ponto atualizado com sucesso', ToastAndroid.LONG);
            navigation.goBack();
        } catch (error) {
            ToastAndroid.show('Erro ao atualizar ponto', ToastAndroid.LONG);
        }
    };

    return (
        <ImageBackground source={fundo} style={styles.background}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.headerText}>Editar Ponto</Text>

                <TextInput
                    style={styles.input}
                    placeholder="NOME"
                    placeholderTextColor="#fff"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="TIPO"
                    placeholderTextColor="#fff"
                    value={tipo}
                    onChangeText={setTipo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CEP"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    value={cep}
                    onChangeText={setCep}
                />
                <TextInput
                    style={styles.input}
                    placeholder="LOGRADOURO"
                    placeholderTextColor="#fff"
                    value={logradouro}
                    onChangeText={setLogradouro}
                />
                <TextInput
                    style={styles.input}
                    placeholder="NÚMERO"
                    placeholderTextColor="#fff"
                    value={numero}
                    onChangeText={setNumero}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
                    <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>CANCELAR</Text>
                </TouchableOpacity>
            </View>
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
        paddingHorizontal: 30,
        marginTop: 60,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: '#027373',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        color: '#fff',
        marginBottom: 12,
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#027373',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: '#FF5C5C',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
