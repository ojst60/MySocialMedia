import axios, { AxiosError } from "axios"; // Import Axios and AxiosError

interface APIConfig {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  baseURL?: string; // Optional base URL
  params?: Record<string, string>;
  body?: Record<string, any>; // Request body for POST, PUT, etc.
}

 const defaultBaseURL = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : "http://localhost:5000/api/v1/"

export async function fetchapi(config: APIConfig) {

 
  const baseURL = config.baseURL ?? defaultBaseURL;

  try {
    const response = await axios({
      ...config,
      baseURL,
      data: config.body, // Use data property for request body
      withCredentials: true,
    });

    const data = response.data;


    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching API:", error.response?.data.message);

      return {
        data: null,
        error: error.response?.data.message || "An unknown error occurred.",
      };
    }

    // If the error is not an AxiosError, handle it generically
    console.error("An unexpected error occurred:", error);
    return {
      data: null,
      error: "An unexpected error occurred.",
    };
  }
}
