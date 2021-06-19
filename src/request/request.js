import axios from 'axios';
const token = localStorage.getItem('accessToken')

axios.defaults.headers['Authorization'] = `Bearer ${token}`

const instance  = axios.create({
  baseURL: 'https://whiteboxpizza.com.ua/api/',
});

export default instance;