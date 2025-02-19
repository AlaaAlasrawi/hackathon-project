import axios from "axios";
import Snackbar from "react-native-snackbar";

class FetchService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(
    endpoint,
    options = {},
    isTokenRequired = true,
    isVoid = false,
    onError = () => {}
  ) {
    const authToken = `Bearer ${localStorage.getItem("authToken")}`;
    const headers = options.headers ?? {};
    headers["Content-Type"] = "application/json";

    if (isTokenRequired) {
      headers["Authorization"] = authToken;
    }

    const method = options.method ? options.method.toLowerCase() : "get";
    const axiosOptions = {
      method: method,
      url: `${this.baseUrl}${endpoint}`,
      headers: headers,
    };

    if (options.body) {
      let data = options.body;
      if (typeof options.body === "string") {
        try {
          data = JSON.parse(options.body);
        } catch (e) {
          console.error("Error parsing options.body:", e);
        }
      }

      if (method === "get" || method === "delete") {
        axiosOptions.params = data;
      } else {
        axiosOptions.data = data;
      }
    }

    try {
      const response = await axios(axiosOptions);

      if (!isVoid) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        onError(error.response);

        const errorResponse = error.response.data;
        Snackbar.show({
          text: `${errorResponse.errorDescription}`,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: "red", // Optional styling
        });
        throw new Error(
          `Backend request error ${errorResponse.errorDescription}`
        );
      } else if (error.request) {
        // Request was made but no response received
        Snackbar.show({
          text: "No response received from server",
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: "red",
        });
        throw new Error("No response received from server");
      } else {
        // Error setting up the request
        Snackbar.show({
          text: "Error setting up request",
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: "red",
        });
        throw new Error("Error setting up request");
      }
    }
  }
}

const fetchService = new FetchService("http://192.168.1.112:8080/");

export default fetchService;

// TODO:
// Token Refresh and Retries
// Add token refresh logic and automatic retries for certain status codes
