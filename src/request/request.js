import axios from 'axios';

const token = localStorage.getItem('accessToken')
const instance  = axios.create({
  baseURL: 'https://pizzavovaapi.herokuapp.com/',
  // headers: {'Authorization': `${token}`}
});

export default instance;