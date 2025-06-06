import React, { useEffect, useState, useCallback } from "react";
import { ImageBackground, FlatList, View, Text, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid, StyleSheet } from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import fundo from "../../assets/fundo6.png";
import { pontoService } from "../services/api/pontoService";
import { PontoDistribuicao, RootStackParamList } from "../types/types";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';
import styles from "../styles/styles";

type ListarPontosScreenNavigationProp = NavigationProp<RootStackParamList, 'ListarPontos'>;

export default function ListarPontosScreen() {
    const navigation = useNavigation<ListarPontosScreenNavigationProp>();
    const [pontos, setPontos] = useState<PontoDistribuicao[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarPontos();
    }, []);

    const carregarPontos = async () => {
        try {
            setLoading(true);
            const data = await pontoService.getPontos();
            setPontos(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar pontos de distribuição');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            carregarPontos();
        }, [])
    );

    const handleDelete = (id: number | undefined) => {
        if (!id) return;
        
        Alert.alert(
            "Confirmar exclusão",
            "Tem certeza que deseja excluir este ponto de distribuição?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await pontoService.deletePonto(id);
                            ToastAndroid.show('Ponto excluído com sucesso', ToastAndroid.LONG);
                            carregarPontos();
                        } catch (err) {
                            ToastAndroid.show('Erro ao excluir ponto', ToastAndroid.LONG);
                        }
                    }
                }
            ]
        );
    };

    const handleEdit = (ponto: PontoDistribuicao) => {
        (navigation as NavigationProp<RootStackParamList>).navigate('EditarPonto', { ponto });
    };

    const renderItem = ({ item }: { item: PontoDistribuicao }) => (
        <View style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 15,
            marginVertical: 8,
            marginHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 3
        }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{item.nome}</Text>
                <Text style={{ fontSize: 14 }}>{item.logradouro}, {item.numero} - {item.cep}</Text>
                <Text style={{ fontSize: 14, marginTop: 4 }}>Tipo: {item.tipo}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={{ marginHorizontal: 8 }}>
                    <Icon name="edit" size={24} color="#00ff00" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginHorizontal: 8 }}>
                    <Icon name="delete" size={24} color="#ff0000" />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <ImageBackground source={fundo} style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            </ImageBackground>
        );
    }

    if (error) {
        return (
            <ImageBackground source={fundo} style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text style={{ color: 'red', fontSize: 16, marginBottom: 10 }}>{error}</Text>
                    <TouchableOpacity
                        onPress={carregarPontos}
                        style={{
                            backgroundColor: '#00ff00',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 5
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 16 }}>Tentar Novamente</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground source={fundo} style={{ flex: 1 }}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16, marginTop: 40 }}>
                    Pontos de Distribuição
                </Text>
                <FlatList
                    data={pontos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id?.toString() ?? ''}
                />
            </View>
        </ImageBackground>
    );
}
