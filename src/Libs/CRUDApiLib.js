import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
    baseURL: 'http://localhost:5000/'
})
