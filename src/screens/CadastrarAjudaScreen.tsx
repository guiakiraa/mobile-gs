import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ToastAndroid,
    ScrollView,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fundo from '../../assets/fundo6.png';
import { ajudaService } from '../services/api/ajudaService';
import { Feather } from '@expo/vector-icons';

export default function CadastrarAjudaScreen() {
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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal={false}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.form}>
                        <Text style={styles.title}>O que aconteceu?</Text>
                        <TextInput
                            placeholder="Descreva seu problema..."
                            placeholderTextColor="#ccc"
                            style={[styles.input, styles.textarea]}
                            value={descricao}
                            onChangeText={setDescricao}
                            multiline
                        />

                        <Text style={[styles.title, { marginTop: 30 }]}>Do que você precisa no momento?</Text>
                        <TextInput
                            placeholder="Ex: Água, móveis, alimentos perecíveis, entre outros..."
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            value={necessidade}
                            onChangeText={setNecessidade}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCadastrar}
                        >
                            <Text style={styles.buttonText}>Enviar</Text>
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
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
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
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007baf',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
