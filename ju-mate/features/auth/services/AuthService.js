import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = "http://192.168.1.112:8080";

const BASE_URL = `${baseUrl}/api/v1/idm/login`;

export async function login(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}`, {
      username,
      password,
    });

    if (response.data && response.data.token) {
      const token = response.data.token;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("username", username);
    } else {
      throw new Error("Invalid response from server");
    }

    return true;
  } catch (error) {
    // console.error("Login error:", error);
    throw new Error("Username or password incorrect");
  }
}

export async function logout() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("username");
}
