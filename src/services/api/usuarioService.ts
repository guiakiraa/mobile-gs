import { Usuario } from '../../types/types';
import api from './api';

export const usuarioService = {
  getUsuarios: async (): Promise<Usuario[]> => {
    try {
      const response = await api.get('/usuario');
      
      console.log('Resposta getUsuarios:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar Usuario:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  createUsuario: async (usuario: Usuario): Promise<Usuario> => {
    try {
    
        console.log(usuario);
        

      const response = await api.post('/usuario', usuario);
      
      console.log('Resposta createUsuario:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar Usuario:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  updateUsuario: async (id: number, usuario: Usuario): Promise<Usuario> => {
    try {

      const response = await api.put(`/usuario/${id}`, usuario);
      
      console.log('Resposta updateUsuario:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar Usuario:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  deleteUsuario: async (id: number): Promise<void> => {
    try {

      const response = await api.delete(`/usuario/${id}`);
      
      console.log('Resposta deleteUsuario:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
    } catch (error: any) {
      console.error('Erro ao deletar Usuario:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },
}; 