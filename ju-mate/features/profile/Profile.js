import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { fetchUserByUsername } from "../../services/IdmService";
import { useRoute } from "@react-navigation/native";
import Colors from "../../constants/color";
import BottomMenuComponent from "../../components/BottomMenu";

export default function ProfileComponent() {
  const route = useRoute();

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { username } = route.params;

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await fetchUserByUsername(username));
    };

    fetchUser();
    setIsLoading(false);
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: user.profilePic }} style={styles.profileImage} />
        <Text style={styles.nameValue}>{user.name}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue}>{user.username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Major</Text>
          <Text style={styles.infoValue}>{user.major}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Bio</Text>
          <Text style={styles.infoValue}>{user.bio}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>College</Text>
          <Text style={styles.infoValue}>{user.collage}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tags</Text>
          <View style={styles.tagsContainer}>
            {user.tags.split(",").map((tag) => {
              return (
                <View style={styles.tagContainer} key={tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              );
            })}
          </View>
        </View>
        {user.disabilities && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Disabilities</Text>
            <View style={styles.tagsContainer}>
              {user.disabilities.split(",").map((disability) => {
                return (
                  <View style={styles.tagContainer} key={disability}>
                    <Text style={styles.tagText}>{disability}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <BottomMenuComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerBackground: {
    backgroundColor: Colors.secondary600,
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  profileImageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    margin: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary500,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "300",
    color: Colors.accent500,
  },
  infoValue: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.accent500,
    marginTop: 5,
  },
  nameValue: {
    fontSize: 22,
    color: Colors.accent500,
    fontWeight: "600",
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    marginTop: 8,
  },
  tagContainer: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.accent500,
  },
});
