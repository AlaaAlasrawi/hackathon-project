import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = "http://192.168.1.112:8080";

const BASE_URL = `${baseUrl}/api/v1/campuslink`;

export async function loadCampusLinkPartners(
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDirection = "desc",
  description = "",
  username = "",
  tags = "",
  sessions = ""
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
        username,
        tags,
        session: sessions,
      },
    };

    const response = await axios.get(`${BASE_URL}/partner`, config);
    return response.data.content;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw new Error("Failed to load partners.");
  }
}

export async function loadCampusLinkGroups(
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDirection = "desc",
  description = "",
  groupName = "",
  tags = "",
  session = "",
  username = ""
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
        groupName,
        tags,
        session,
        username,
      },
    };

    const response = await axios.get(`${BASE_URL}/groups`, config);
    return response.data.content;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw new Error("Failed to load groups.");
  }
}

export async function createCampusLinkGroup(requestData) {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${BASE_URL}/groups`,
      requestData,
      config
    );
  } catch (error) {
    console.error("something went wrong:", error);
    throw new Error("Username or password incorrect");
  }
}

export async function createCampusLinkPartner(requestData) {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${BASE_URL}/partner`,
      requestData,
      config
    );
  } catch (error) {
    console.error("something went wrong:", error);
    throw new Error("Username or password incorrect");
  }
}
