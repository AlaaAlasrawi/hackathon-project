import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Colors from "../constants/color";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalWithTwoOptions from "./ModalWithTwoOptions";
import { useState } from "react";
import CreateCampusPartnerForm from "../features/campusLink/forms/CreateCampusPartnerForm";
import CreateCampusGroupForm from "../features/campusLink/forms/CreateCampusGroupForm";

export default function BottomMenuComponent() {
  const navigation = useNavigation();

  const [createCampusOptionsVisible, setCreateCampusOptionsVisible] =
    useState(false);

  const [createCampusPartnerFormVisible, setCreateCampusPartnerFormVisible] =
    useState(false);

  const [createCampusGroupFormVisible, setCreateCampusGroupFormVisible] =
    useState(false);

  const handleProfileNavigation = async () => {
    const currentUsername = await AsyncStorage.getItem("username");
    if (currentUsername) {
      navigation.navigate("Profile", { username: currentUsername });
    }
  };

  const handleHomeNavigation = async () => {
    navigation.navigate("Home");
  };

  const handleCampusCreation = () => {
    setCreateCampusOptionsVisible(true);
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={handleHomeNavigation}>
        <Ionicons name="home-outline" size={24} color={Colors.accent500} />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleCampusCreation}>
        <Ionicons name="add" size={24} color={Colors.accent500} />
        <Text style={styles.menuText}>Create Campus</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={handleProfileNavigation}
      >
        <Ionicons name="person-outline" size={24} color={Colors.accent500} />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      <ModalWithTwoOptions
        optionOneName={"Create Campus Group"}
        optionTwoName={"Create Campus Partner"}
        optionOneAction={() => {
          setCreateCampusGroupFormVisible(true);
        }}
        optionTwoAction={() => {
          setCreateCampusPartnerFormVisible(true);
        }}
        modalVisible={createCampusOptionsVisible}
        setModalVisible={setCreateCampusOptionsVisible}
      />

      <CreateCampusPartnerForm
        modalVisible={createCampusPartnerFormVisible}
        setModalVisible={setCreateCampusPartnerFormVisible}
      />

      <CreateCampusGroupForm
        modalVisible={createCampusGroupFormVisible}
        setModalVisible={setCreateCampusGroupFormVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#fff",
    backgroundColor: "#ffffff",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    fontSize: 12,
    color: Colors.accent500,
    marginTop: 5,
  },
});
