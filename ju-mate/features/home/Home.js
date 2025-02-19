import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import Colors from "../../constants/color";
import HeaderComponent from "../../components/Header";
import BottomMenuComponent from "../../components/BottomMenu";
import ModalWithTwoOptions from "../../components/ModalWithTwoOptions";
import PostDisabilityRequest from "../disability/PostDisabilityRequest";
import { useNavigation } from "@react-navigation/native";

export default function HomeComponent() {
  const navigation = useNavigation();

  const [isCampusLinkOptionShown, setIsCampusLinkOptionShown] = useState(false);
  const [isDisabilityOptionShown, setIsDisabilityOptionShown] = useState(false);

  const [postDisabilityRequestVisible, setPostDisabilityRequestVisible] =
    useState(false);

  function onStudyPressed() {
    setIsCampusLinkOptionShown(true);
    setIsDisabilityOptionShown(false);
  }

  function onDisabilityPressed() {
    setIsCampusLinkOptionShown(false);
    setIsDisabilityOptionShown(true);
  }

  function onVolunteer() {
    navigation.navigate("DisabilityRequests");
  }

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView contentContainerStyle={styles.middleContainer}>
        <Text style={styles.questionText}>What are you looking for?</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={onStudyPressed} style={styles.optionBox}>
            <Image
              source={require("../../assets/features/study.png")}
              style={styles.optionImage}
            />
            <Text style={styles.optionText}>Campus Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDisabilityPressed}
            style={styles.optionBox}
          >
            <Image
              source={require("../../assets/features/disability.png")}
              style={styles.optionImage}
            />
            <Text style={styles.optionText}>Disability Student Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomMenuComponent />

      <ModalWithTwoOptions
        optionOneName={"Partner"}
        optionTwoName={"Group"}
        optionOneAction={() => {
          navigation.navigate("CampusLinkPartners");
        }}
        optionTwoAction={() => {
          navigation.navigate("CampusLinkGroups");
        }}
        modalVisible={isCampusLinkOptionShown}
        setModalVisible={setIsCampusLinkOptionShown}
      />

      <ModalWithTwoOptions
        optionOneName={"Post a request"}
        optionTwoName={"volunteer (help)"}
        optionOneAction={() => {
          setPostDisabilityRequestVisible(true);
        }}
        optionTwoAction={() => {
          onVolunteer();
        }}
        modalVisible={isDisabilityOptionShown}
        setModalVisible={setIsDisabilityOptionShown}
      />

      <PostDisabilityRequest
        modalVisible={postDisabilityRequestVisible}
        setModalVisible={setPostDisabilityRequestVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  middleContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  questionText: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary500,
    marginBottom: 30,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 30,
  },
  optionBox: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  optionImage: {
    width: 60,
    height: 60,
    marginBottom: 15,
    borderRadius: 10,
    resizeMode: "contain",
  },
  optionText: {
    color: Colors.accent500,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
