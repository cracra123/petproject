import axios from "axios";

const API_BASE_URL=process.env.REACT_APP_API_URL;

export const apiAxios = axios.create({
  baseURL: "http://parallax-project.ru:5000/",
});

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});
apiAxios.interceptors.response.use((res) => {
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    delete res.data.token;
    return res;
  }
  return res;
});
