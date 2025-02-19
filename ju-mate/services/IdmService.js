import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = "http://192.168.1.112:8080";

const BASE_URL = `${baseUrl}/api/v1/idm`;

export async function fetchUserByUsername(username) {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(`${BASE_URL}/${username}`, config);
    return response.data;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw new Error("Failed to load partners.");
  }
}
