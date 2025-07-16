import axios from 'axios';

const BASE_URL = 'https://www.viriksonholidays.co.uk/ci-admin/index.php/access/app/v1/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': "Bearer gsa*6dt3@72t&6dtuy6R$^gjff", 
  }
});

export default api;