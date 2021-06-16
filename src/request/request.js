import axios from 'axios';

const token = localStorage.getItem('accessToken')
const instance  = axios.create({
  baseURL: 'https://whiteboxpizza.com.ua/api/',
  // headers: {'Authorization': `${token}`}
});

export default instance;