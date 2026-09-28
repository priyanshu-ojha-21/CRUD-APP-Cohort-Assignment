import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../modules/auth/context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const useApi = () => {
  const { accessToken, setAccessToken } = useAuth();

  useEffect(() => {
    const reqId = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resId = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true; 
          const { data } = await axiosInstance.post("/auth/refresh-token");
          const newToken = data.data.accessToken;
          setAccessToken(newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqId);
      axiosInstance.interceptors.response.eject(resId);
    };
  }, [accessToken, setAccessToken]);

  return axiosInstance;
};
export default useApi;
