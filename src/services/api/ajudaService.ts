import { Ajuda } from '../../types/types';
import api from './api';

export const ajudaService = {
  getAjudas: async (): Promise<Ajuda[]> => {
    try {
      const response = await api.get('/ajuda');
      
      console.log('Resposta getAjudas:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar Ajuda:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  createAjuda: async (ajuda: Ajuda): Promise<Ajuda> => {
    try {

        console.log("Ajuda", ajuda);

      const response = await api.post('/ajuda', ajuda);

      
      
      console.log('Resposta createAjuda:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar Ajuda:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  updateAjuda: async (id: number, ajuda: Ajuda): Promise<Ajuda> => {
    try {

      const response = await api.put(`/ajuda/${id}`, ajuda);
      
      console.log('Resposta updateAjuda:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar Ajuda:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  deleteAjuda: async (id: number): Promise<void> => {
    try {

      const response = await api.delete(`/ajuda/${id}`);
      
      console.log('Resposta deleteAjuda:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
    } catch (error: any) {
      console.error('Erro ao deletar Ajuda:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },
}; 