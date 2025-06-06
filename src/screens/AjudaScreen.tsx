import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, View, Text, TextInput, ScrollView, ToastAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "../styles/styles";
import fundo from "../../assets/fundo6.png";
import { Feather } from '@expo/vector-icons';
import { ajudaService } from '../services/api/ajudaService';

export default function AjudaScreen() {
    const navigation = useNavigation();
    const [descricao, setDescricao] = useState('');
    const [necessidade, setNecessidade] = useState('');

    const handleCadastrar = async () => {
        if (!descricao || !necessidade) {
            ToastAndroid.show('Preencha todos os campos', ToastAndroid.LONG);
            return;
        }

        try {
            await ajudaService.createAjuda({
                descricao,
                necessidade
            });

            ToastAndroid.show('Ajuda cadastrada com sucesso', ToastAndroid.LONG);
            navigation.goBack();
        } catch (error) {
            ToastAndroid.show('Erro ao cadastrar ajuda', ToastAndroid.LONG);
        }
    };

    return (
        <ImageBackground source={fundo} style={styles.background}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.form}>
                        <Text style={styles.welcome}>CADASTRAR AJUDA</Text>
                        
                        <Text style={styles.label}>DESCRIÇÃO</Text>
                        <TextInput
                            placeholder="Digite a descrição da ajuda"
                            placeholderTextColor="#aaa"
                            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                            value={descricao}
                            onChangeText={setDescricao}
                            multiline
                        />

                        <Text style={[styles.label, { marginTop: 20 }]}>NECESSIDADE</Text>
                        <TextInput
                            placeholder="Digite a necessidade"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={necessidade}
                            onChangeText={setNecessidade}
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