import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import Colors from "../constants/color";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../features/auth/services/AuthService";

export default function HeaderComponent() {
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    navigation.navigate("Auth");
  };

  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color={Colors.accent500} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.accent500,
    textAlign: "center",
  },
  notificationsList: {
    width: "100%",
    maxHeight: 400,
    marginBottom: 15,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notificationIcon: {
    marginRight: 10,
  },
  notificationText: {
    fontSize: 16,
    color: Colors.accent500,
  },
  closeButton: {
    backgroundColor: Colors.primary600,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
