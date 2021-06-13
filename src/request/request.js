import axios from 'axios';

const token = localStorage.getItem('accessToken')
const instance  = axios.create({
  baseURL: 'http://159.89.5.85/api/',
  // headers: {'Authorization': `${token}`}
});

export default instance;