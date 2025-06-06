import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface Usuario {
    id?: number;
    nome: string;
    cep: string;
    cidade: string;
    complemento?: string;
    logradouro: string;
    numero: string;
}

export interface Ajuda {
    id?: number;
    descricao: string;
    necessidade: string;
}

export interface PontoDistribuicao {
    id?: number;
    nome: string;
    tipo: string;
    cep: string;
    logradouro: string;
    numero: string;
}

export interface Endereco {
    id: number;
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string | null;
    logradouro: string;
    numero: string;
    uf: string;
}

// Tipos navegação
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Menu: undefined;
    CadastrarPonto: undefined;
    ListarPontos: undefined;
    EditarPonto: {
        ponto: PontoDistribuicao;
    };
    CadastrarAjuda: undefined;
};

// Props de navegação
export interface NavigationProps {
    navigation: NativeStackNavigationProp<RootStackParamList>;
}

