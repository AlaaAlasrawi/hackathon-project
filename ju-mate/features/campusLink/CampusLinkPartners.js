import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import Colors from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";
import { loadCampusLinkPartners } from "./services/CampusLinkService";
import BottomMenuComponent from "../../components/BottomMenu";

export default function CampusLinkPartners() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    username: "",
    tags: "",
    session: "",
  });

  useEffect(() => {
    const fetchRequests = async () => {
      const initialPartners = await loadCampusLinkPartners(
        0,
        10000,
        "createdAt",
        "desc",
        searchQuery,
        selectedFilter.username,
        selectedFilter.tags,
        selectedFilter.session
      );
      setPartners(initialPartners);
      setFilteredPartners(initialPartners);
    };

    fetchRequests();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = partners.filter((partner) =>
      partner.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPartners(filtered);
  };

  const applyFilters = async () => {
    try {
      const filtered = await loadCampusLinkPartners(
        0, // page
        10000, // size
        "createdAt", // sortBy
        "desc", // sortDirection
        searchQuery,
        selectedFilter.username,
        selectedFilter.tags,
        selectedFilter.session
      );

      setFilteredPartners(filtered);
      setModalVisible(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleRequestPress = (request) => {
    let link = `https://teams.microsoft.com/l/chat/0/0?users=${request.username}@ju.edu.jo`;
    Linking.openURL(link).catch((err) =>
      console.error("Failed to open Teams link", err)
    );
  };

  const renderPartnerItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleRequestPress(item);
      }}
    >
      <View style={styles.partnerItem}>
        <Text style={styles.partnerDescription}>{item.description}</Text>
        <Text style={styles.partnerDetails}>Username: {item.username}</Text>
        <Text style={styles.partnerDetails}>Sessions: {item.session}</Text>
        <Text style={styles.partnerDetails}>Tags: {item.tags}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search partners..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={Colors.placeHolder}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="filter-outline" size={24} color={Colors.accent500} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPartners}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPartnerItem}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Partners</Text>
            <TextInput
              style={styles.input}
              placeholder="Filter by Username"
              value={selectedFilter.username}
              onChangeText={(text) =>
                setSelectedFilter({ ...selectedFilter, username: text })
              }
              placeholderTextColor={Colors.placeHolder}
            />
            <TextInput
              style={styles.input}
              placeholder="Filter by Tags"
              value={selectedFilter.tags}
              onChangeText={(text) =>
                setSelectedFilter({ ...selectedFilter, tags: text })
              }
              placeholderTextColor={Colors.placeHolder}
            />
            <TextInput
              style={styles.input}
              placeholder="Filter by Sessions"
              value={selectedFilter.session}
              onChangeText={(text) =>
                setSelectedFilter({ ...selectedFilter, session: text })
              }
              placeholderTextColor={Colors.placeHolder}
            />
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

      <BottomMenuComponent />
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
  listContainer: {
    paddingBottom: 20,
  },
  partnerItem: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  partnerDescription: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent500,
    marginBottom: 5,
  },
  partnerDetails: {
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
