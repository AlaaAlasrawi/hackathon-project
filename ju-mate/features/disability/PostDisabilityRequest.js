import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../constants/color";
import { postRequest } from "./services/DisabilityService";

export default function PostDisabilityRequest({
  modalVisible,
  setModalVisible,
}) {
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [place, setPlace] = useState("");
  const [disabilitiesName, setDisabilitiesName] = useState("");
  const [error, setError] = useState("");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const handleSubmit = () => {
    if (!description || !time || !place || !disabilitiesName) {
      setError("All fields are required");
      return;
    }
    setError("");

    const requestData = {
      description,
      time,
      place,
      disabilitiesName,
    };
    postRequest(requestData);
    setModalVisible(false);

    setDescription("");
    setTime(new Date());
    setPlace("");
    setDisabilitiesName("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Post Disability Request</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={Colors.placeHolder}
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDateTimePicker(true)}
            >
              <Text style={styles.dateTimeText}>{time.toLocaleString()}</Text>
            </TouchableOpacity>
            {showDateTimePicker && (
              <DateTimePicker
                value={time}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDateTimePicker(false);
                  if (selectedDate) {
                    setTime(selectedDate);
                  }
                }}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Place"
              value={place}
              onChangeText={setPlace}
              placeholderTextColor={Colors.placeHolder}
            />
            <TextInput
              style={styles.input}
              placeholder="Disabilities (comma separated)"
              value={disabilitiesName}
              onChangeText={setDisabilitiesName}
              placeholderTextColor={Colors.placeHolder}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.accent500,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.accent500,
    borderRadius: 8,
  },
  dateTimeText: {
    color: Colors.accent500,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.secondary500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary600,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
