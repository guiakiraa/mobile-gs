import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ToastAndroid, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import fundo from '../../assets/fundo6.png';
import styles from '../styles/styles';
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
                <View style={styles.form}>
                    <Text style={styles.welcome}>EDITAR PONTO</Text>
                    
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
                        onChangeText={setCep}
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
                        onPress={handleSalvar}
                    >
                        <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { marginTop: 10, backgroundColor: '#ff0000' }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>CANCELAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
} 