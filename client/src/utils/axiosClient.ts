import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://hacktiv.fathanabds.online',
});

export default axiosClient;
