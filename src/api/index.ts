import axios from 'axios';
import { useStore } from 'vuex';

const base = 'https://calendar-api-v2.herokuapp.com/api/';
export default {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(base + 'auth/login', {
        email, password
      });
      if (response.data.token.accessToken) {
        localStorage.setItem('token', response.data.token.accessToken)
      }
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  async getEvents(): Promise<any> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }
      const response = await axios.get(base + 'events', config);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async postEvent(title: string, date: string, description: string): Promise<any> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }
      const response = await axios.post(base + 'events', {
        title, date, description
      }, config);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async deleteEvent(id: any): Promise<any> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }
      const response = await axios.delete(base + 'events/' + id, config);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
}