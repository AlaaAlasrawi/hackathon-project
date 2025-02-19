import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "http://192.168.1.112:8080";

const BASE_URL = `${baseUrl}/api/v1/SpecialNeedsSupport`;

export async function postRequest(data) {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(`${BASE_URL}/request`, data, config);
  } catch (error) {
    console.error("something went wrong:", error);
    throw new Error("Username or password incorrect");
  }
}

export async function loadRequests(
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDirection = "desc",
  description = "",
  disabilitiesName = "",
  place = "",
  startTime = null,
  endTime = null
) {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        page,
        size,
        sortBy,
        sortDirection,
        description,
        disabilitiesName,
        place,
        timeFrom: startTime ? startTime.toISOString() : undefined,
        timeTo: endTime ? endTime.toISOString() : undefined,
      },
    };

    const response = await axios.get(`${BASE_URL}`, config);
    return response.data.content;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw new Error("Failed to load requests.");
  }
}
