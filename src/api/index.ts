import axios from 'axios';

const base = 'https://calendar-api-v2.herokuapp.com/api/';

export default {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(base + 'auth/login', {
        email, password
      });
      if (response.data.token.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data.token));
      }
      return response.data;
    } catch (error) {
      return error;
    }
  },

  logout() {
    localStorage.removeItem('user');
  }
}