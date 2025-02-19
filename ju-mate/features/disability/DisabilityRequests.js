import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
} from "react-native";
import Colors from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { loadRequests } from "./services/DisabilityService";
import BottomMenuComponent from "../../components/BottomMenu";

export default function DisabilityRequests() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    disabilitiesName: "",
    place: "",
    startTime: null,
    endTime: null,
  });

  useEffect(() => {
    const fetchRequests = async () => {
      const initialRequests = await loadRequests(
        0,
        10000,
        "createdAt",
        "desc",
        searchQuery,
        selectedFilter.disabilitiesName,
        selectedFilter.place,
        selectedFilter.startTime,
        selectedFilter.endTime
      );
      setRequests(initialRequests);
      setFilteredRequests(initialRequests);
    };

    fetchRequests();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = requests.filter((request) =>
      request.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  const applyFilters = async () => {
    try {
      const filtered = await loadRequests(
        0,
        10000,
        "createdAt",
        "desc",
        searchQuery,
        selectedFilter.disabilitiesName,
        selectedFilter.place,
        selectedFilter.startTime,
        selectedFilter.endTime
      );

      setFilteredRequests(filtered);
      setModalVisible(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleRequestPress = (request) => {
    let link = `https://teams.microsoft.com/l/chat/0/0?users=${request.requesterUsername}@ju.edu.jo`;
    Linking.openURL(link).catch((err) =>
      console.error("Failed to open Teams link", err)
    );
  };

  const renderRequestItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRequestPress(item)}>
      <View style={styles.requestItem}>
        <Text style={styles.requestDescription}>{item.description}</Text>
        <Text style={styles.requestDetails}>
          Username: {item.requesterUsername}
        </Text>
        <Text style={styles.requestDetails}>
          Time: {item.time.toLocaleString()}
        </Text>
        <Text style={styles.requestDetails}>Place: {item.place}</Text>
        <Text style={styles.requestDetails}>
          Disabilities: {item.disabilitiesName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search requests..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={Colors.placeHolder}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="filter-outline" size={24} color={Colors.accent500} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
        contentContainerStyle={{ paddingBottom: 0 }}
      />

      <BottomMenuComponent />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Requests</Text>
            <TextInput
              style={styles.input}
              placeholder="Filter by Disability"
              value={selectedFilter.disabilitiesName}
              onChangeText={(text) =>
                setSelectedFilter({ ...selectedFilter, disabilitiesName: text })
              }
              placeholderTextColor={Colors.placeHolder}
            />
            <TextInput
              style={styles.input}
              placeholder="Filter by Place"
              value={selectedFilter.place}
              onChangeText={(text) =>
                setSelectedFilter({ ...selectedFilter, place: text })
              }
              placeholderTextColor={Colors.placeHolder}
            />
            <View style={styles.dateTimePickerContainer}>
              <Text style={styles.dateTimeLabel}>Start Time:</Text>
              <DateTimePicker
                value={selectedFilter.startTime || new Date()}
                mode="datetime"
                display="default"
                onChange={(event, date) =>
                  setSelectedFilter({ ...selectedFilter, startTime: date })
                }
              />
            </View>
            <View style={styles.dateTimePickerContainer}>
              <Text style={styles.dateTimeLabel}>End Time:</Text>
              <DateTimePicker
                value={selectedFilter.endTime || new Date()}
                mode="datetime"
                display="default"
                onChange={(event, date) =>
                  setSelectedFilter({ ...selectedFilter, endTime: date })
                }
              />
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    paddingBottom: 0,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.accent500,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  requestItem: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  requestDescription: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent500,
    marginBottom: 5,
  },
  requestDetails: {
    fontSize: 14,
    color: Colors.accent500,
  },
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
  dateTimePickerContainer: {
    width: "100%",
    marginVertical: 10,
  },
  dateTimeLabel: {
    fontSize: 16,
    color: Colors.accent500,
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: Colors.secondary500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  applyButtonText: {
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
});
