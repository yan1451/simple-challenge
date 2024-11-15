import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 100000,
});

export const publicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 100000,
})

type User = {
  name: string;
  email: string;
  password: string;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await publicApiClient.post("/auth/login", {  email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user: User) => {
  try {
    return await publicApiClient.post("/user/sign-up", user);
  } catch (error) {
    throw error
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout")
    return response;
  } catch {
    throw new Error("Erro ao tentar realizar logout.");
  }
};

export const loginConfirmation = async () => {
  const response = await apiClient.get(`/auth/login/confirmation`);
  return response.data;
};

export const refreshAccessToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh');
    return response; 
  } catch (error) {
    console.error("Erro ao renovar o token", error);
    throw error;
  }
}

let refreshing = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !refreshing) {
      refreshing = true;
      try {

        await refreshAccessToken(); 

        return apiClient(error.config);
      } catch (e) {
        console.error("Erro ao tentar renovar o token", e);
        window.location.href = "/"; 
        return Promise.reject(e);
      } finally {
        refreshing = false;
      }
    }

    return Promise.reject(error);
  }
);