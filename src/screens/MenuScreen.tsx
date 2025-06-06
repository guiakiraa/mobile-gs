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
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.welcome}>BEM-VINDO</Text>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('CadastrarPonto')}
                    >
                        <Text style={styles.buttonText}>CADASTRAR PONTO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('ListarPontos')}
                    >
                        <Text style={styles.buttonText}>LISTAR PONTOS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('CadastrarAjuda')}
                    >
                        <Text style={styles.buttonText}>CADASTRAR AJUDA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { marginTop: 20, backgroundColor: '#ff0000' }]}
                        onPress={handleLogout}
                    >
                        <Text style={styles.buttonText}>SAIR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});