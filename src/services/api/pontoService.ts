import { PontoDistribuicao } from '../../types/types';
import api from './api';

export const pontoService = {
  getPontos: async (): Promise<PontoDistribuicao[]> => {
    try {
      const response = await api.get('/ponto-distribuicao');
      
      console.log('Resposta getPontos:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar pontos:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  createPonto: async (ponto: PontoDistribuicao): Promise<PontoDistribuicao> => {
    try {

      const response = await api.post('/ponto-distribuicao', ponto);

      console.log(ponto);
      
      
      console.log('Resposta createPonto:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar ponto:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  updatePonto: async (id: number | undefined, ponto: PontoDistribuicao): Promise<PontoDistribuicao> => {
    if (!id) throw new Error('ID do ponto é obrigatório');
    try {

      const response = await api.put(`/ponto-distribuicao/${id}`, ponto);
      
      console.log('Resposta updatePonto:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar ponto:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  deletePonto: async (id: number | undefined): Promise<void> => {
    if (!id) throw new Error('ID do ponto é obrigatório');
    try {

      const response = await api.delete(`/ponto-distribuicao/${id}`);
      
      console.log('Resposta deletePonto:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
    } catch (error: any) {
      console.error('Erro ao deletar ponto:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },
}; 