import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../../../constants/color";
import { createCampusLinkGroup } from "../services/CampusLinkService";

export default function CreateCampusGroupForm({
  modalVisible,
  setModalVisible,
}) {
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [sessions, setSessions] = useState("");
  const [tags, setTags] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleSubmit = () => {
    if (!description || !members || !sessions || !tags || !groupName) {
      alert("All fields are required");
      return;
    }

    const newGroup = {
      description,
      members,
      session: sessions,
      tags: tags,
      groupName,
    };

    createCampusLinkGroup(newGroup);
    setModalVisible(false);
    clearInputs();
  };

  const clearInputs = () => {
    setDescription("");
    setMembers("");
    setSessions("");
    setTags("");
    setGroupName("");
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
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Create Campus Group</Text>
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={groupName}
              onChangeText={setGroupName}
              placeholderTextColor={Colors.placeHolder}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={Colors.placeHolder}
            />
            <TextInput
              style={styles.input}
              placeholder="Members (e.g. user1, user2, user3)"
              value={members}
              onChangeText={setMembers}
              placeholderTextColor={Colors.placeHolder}
            />
            <TextInput
              style={styles.input}
              placeholder="Sessions (e.g. Everyday from 1:00PM to 4:00PM)"
              value={sessions}
              onChangeText={setSessions}
              placeholderTextColor={Colors.placeHolder}
            />
            <TextInput
              style={styles.input}
              placeholder="Tags (e.g. Math, Thinking)"
              value={tags}
              onChangeText={setTags}
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
          </KeyboardAvoidingView>
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
    marginBottom: 20,
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
});
