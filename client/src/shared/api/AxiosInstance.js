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
        // refresh-token call khud fail hui ho to usko retry mat karo, warna infinite loop
        const isRefreshCall = error.config?.url?.includes("/auth/refresh-token");

        if (error.response?.status === 401 && !error.config._retry && !isRefreshCall) {
          error.config._retry = true;
          try {
            const { data } = await axiosInstance.post("/auth/refresh-token");
            const newToken = data.data.accessToken;
            setAccessToken(newToken);
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(error.config);
          } catch (refreshErr) {
            // refresh bhi fail hua — genuinely logged out hai, loop mat bana
            setAccessToken(null);
            return Promise.reject(refreshErr);
          }
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