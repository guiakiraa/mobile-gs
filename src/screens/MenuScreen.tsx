import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../styles/styles";
import fundo from "../../assets/fundo6.png";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';

type MenuScreenNavigationProp = NavigationProp<RootStackParamList, 'Menu'>;

export default function MenuScreen() {
    const navigation = useNavigation<MenuScreenNavigationProp>();

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <ImageBackground source={fundo} style={styles.background}>
            <View style={localStyles.container}>
                <View style={localStyles.welcomeContainer}>
                    <Text style={localStyles.welcomeText}>Oi, xxxx!</Text>
                    <Text style={localStyles.subtitleText}>Como podemos te ajudar hoje?</Text>
                </View>

                <TouchableOpacity
                    style={localStyles.button}
                    onPress={() => navigation.navigate('CadastrarAjuda')}>
                    <Text style={localStyles.buttonText}>Solicitar Ajuda</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={localStyles.button}
                    onPress={() => navigation.navigate('CadastrarPonto')}>
                    <Text style={localStyles.buttonText}>Cadastrar ponto de distribuição</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={localStyles.button}
                    onPress={() => navigation.navigate('ListarPontos')}>
                    <Text style={localStyles.buttonText}>Encontrar pontos perto de mim</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[localStyles.button, localStyles.logoutButton]}
                    onPress={handleLogout}>
                    <Text style={localStyles.buttonText}>Ver meus pontos</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    welcomeText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 5,
    },
    subtitleText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#028F8F',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 15,
        width: '90%',
        alignItems: 'center',
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#028F8F',
        marginTop: 0,
    },
});
