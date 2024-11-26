import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

interface APIConfig {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PATCH" | "PUT"; // Optional, defaults to GET
  baseURL?: string;
  params?: Record<string, string>;
  body?: Record<string, any>;
}

// Set the base URL based on the environment
const defaultBaseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : "http://localhost:5000/api/v1/";

export async function fetchApi(config: APIConfig) {
  const baseURL = config.baseURL ?? defaultBaseURL;
  const method = config.method ?? "GET";

  try {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      method,
      baseURL,
      data: config.body,
      withCredentials: true,
    };

    const response = await axios(axiosConfig);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        // Trigger logout on a 401 Unauthorized response . The backend should also clear clear the cookie
        store.dispatch(logout());
      }
      // Return a standard error message
      return {
        data: null,
        error: error.response?.data?.message || "An API error occurred.",
      };
    }

    console.error("An unexpected error occurred:", error);
    return {
      data: null,
      error: "An unexpected error occurred.",
    };
  }
}
