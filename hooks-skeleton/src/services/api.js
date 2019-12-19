import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-box.herokuapp.com'
});

export default api;