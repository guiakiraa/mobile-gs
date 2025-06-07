import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ToastAndroid,
    ScrollView,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fundo from '../../assets/fundo6.png';
import { Feather } from '@expo/vector-icons';
import { pontoService } from '../services/api/pontoService';
import { PontoDistribuicaoProximoDTO } from '../types/types';

export default function BuscarPontosScreen() {
    const navigation = useNavigation();
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pontosProximos, setPontosProximos] = useState<PontoDistribuicaoProximoDTO[]>([]);
    const [loading, setLoading] = useState(false);

    const buscarCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setLogradouro(data.logradouro);
                setCidade(data.localidade);
                setEstado(data.uf);
            } else {
                ToastAndroid.show('CEP não encontrado', ToastAndroid.LONG);
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            ToastAndroid.show('Erro ao buscar CEP', ToastAndroid.LONG);
        }
    };

    const buscarPontosProximos = async () => {
        if (!cep) {
            ToastAndroid.show('Digite um CEP', ToastAndroid.LONG);
            return;
        }

        try {
            setLoading(true);
            const pontos = await pontoService.getPontosProximos(cep);
            setPontosProximos(pontos);
        } catch (error) {
            ToastAndroid.show('Erro ao buscar pontos próximos', ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    const renderPonto = ({ item }: { item: PontoDistribuicaoProximoDTO }) => (
        <View style={styles.pontoCard}>
            <View style={styles.pontoInfo}>
                <Text style={styles.pontoNome}>{item.nome}</Text>
                <Text style={styles.pontoEndereco}>
                    {item.logradouro}, {item.numero} - {item.cep}
                </Text>
                <Text style={styles.pontoEndereco}>Tipo: {item.tipo}</Text>
                <Text style={styles.pontoCapacidade}>
                    Distância: {item.distanciaEmKm.toFixed(2)} km
                </Text>
            </View>
        </View>
    );

    return (
        <ImageBackground source={fundo} style={styles.background}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.form}>
                        <Text style={styles.welcome}>BUSCAR PONTOS PRÓXIMOS</Text>

                        <Text style={styles.label}>CEP</Text>
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
                            maxLength={8}
                        />

                        <Text style={[styles.label, { marginTop: 20 }]}>LOGRADOURO</Text>
                        <TextInput
                            placeholder="Logradouro"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={logradouro}
                            editable={false}
                        />

                        <Text style={[styles.label, { marginTop: 20 }]}>CIDADE</Text>
                        <TextInput
                            placeholder="Cidade"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={cidade}
                            editable={false}
                        />

                        <Text style={[styles.label, { marginTop: 20 }]}>ESTADO</Text>
                        <TextInput
                            placeholder="Estado"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={estado}
                            editable={false}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={buscarPontosProximos}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'BUSCANDO...' : 'BUSCAR PONTOS PRÓXIMOS'}
                            </Text>
                        </TouchableOpacity>

                        {loading ? (
                            <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 20 }} />
                        ) : (
                            <FlatList
                                data={pontosProximos}
                                renderItem={renderPonto}
                                keyExtractor={(item) => item.id.toString()}
                                style={{ width: '100%', marginTop: 20 }}
                                ListEmptyComponent={
                                    pontosProximos.length === 0 && !loading ? (
                                        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
                                            Nenhum ponto encontrado
                                        </Text>
                                    ) : null
                                }
                            />
                        )}
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
    },
    backButton: {
        marginTop: 40,
        marginBottom: 20,
    },
    form: {
        marginTop: 10,
    },
    welcome: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'rgba(0, 105, 120, 0.4)',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#0077c2',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    pontoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    pontoInfo: {
        flexDirection: 'column',
    },
    pontoNome: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    pontoEndereco: {
        color: '#ccc',
        fontSize: 14,
    },
    pontoCapacidade: {
        marginTop: 5,
        color: '#8ef',
        fontSize: 14,
    },
});
