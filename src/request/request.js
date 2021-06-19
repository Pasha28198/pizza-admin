import axios from 'axios';
const token = localStorage.getItem('accessToken')

const headers = new Headers({
  'Authorization': `Bearer ${token}`
})

const instance  = axios.create({
  baseURL: 'https://whiteboxpizza.com.ua/api/',
  headers
});

export default instance;