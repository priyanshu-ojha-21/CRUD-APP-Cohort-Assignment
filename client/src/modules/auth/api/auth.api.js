import useApi from "../../../shared/api/AxiosInstance";

export const useAuthApi = () => {
  const api = useApi();

  // POST /api/auth/register
  const register = (formData) => api.post("/auth/register", formData);

  // POST /api/auth/login
  const login = (formData) => api.post("/auth/login", formData);

  // POST /api/auth/logout  (authenticated)
  const logout = () => api.post("/auth/logout");

  // GET /api/auth/me  (authenticated)
  const getMe = () => api.get("/auth/me");

  // POST /api/auth/refresh-token
  // (normally interceptor hi isko call karta hai 401 pe, but standalone bhi export kar rahe
  //  hain agar kahi manually call karna pade, jaise app load hote hi silent-login ke liye)
  const refreshToken = () => api.post("/auth/refresh-token");

  return { register, login, logout, getMe, refreshToken };
};