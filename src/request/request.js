import axios from 'axios';
const token = localStorage.getItem('accessToken')

axios.defaults.headers['Authorization'] = `Bearer ${token}`

const headers = new Headers({
  'Accept-Version': 1,
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token}`
})

const instance  = axios.create({
  baseURL: 'https://whiteboxpizza.com.ua/api/',
  headers
});

export default instance;