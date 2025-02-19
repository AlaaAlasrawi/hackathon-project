import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from "react-native";
import Colors from "../../constants/color";
import { login } from "./services/AuthService";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthComponent() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedToken = await AsyncStorage.getItem("token");
      if (storedUsername && storedToken) {
        navigation.navigate("Home");
      }
    };

    checkLoginStatus();
  }, []);

  const clearInput = () => {
    setUsername("");
    setPassword("");
    setUsernameError("");
    setPasswordError("");
  };

  const validateInput = () => {
    let valid = true;
    if (username.trim() === "") {
      setUsernameError("Username is required");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const onLoginPress = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      await login(username, password);
      clearInput();
      navigation.navigate("Home");
    } catch (error) {
      showMessage({
        message: error.message || "An error occurred during login",
        type: "danger",
      });
    }
  };

  const onForgotPasswordPress = () => {
    const url = "https://adresetpw.ju.edu.jo/";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const onChangeUsername = (text) => {
    setUsername(text);
    setUsernameError("");
    setPasswordError("");
  };

  const onChangePassword = (text) => {
    setPassword(text);
    setPasswordError("");
    setUsernameError("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.rootContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.titleText}>Ju Mate</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, usernameError ? styles.inputError : null]}
              placeholder="Username (e.g. ala0206138)"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={onChangeUsername}
            />
            {usernameError ? (
              <Text style={styles.errorMessage}>{usernameError}</Text>
            ) : null}

            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={onChangePassword}
            />
            {passwordError ? (
              <Text style={styles.errorMessage}>{passwordError}</Text>
            ) : null}

            <TouchableOpacity
              onPress={onForgotPasswordPress}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>University Of Jordan</Text>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#ffffff", // Set background color to white
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 280, // Increased width for better visibility
    height: 280, // Increased height for better visibility
    resizeMode: "contain",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.primary500,
    marginTop: -35,
    marginBottom: 30,
    fontFamily: "open-sans-bold",
    textShadowColor: "rgba(0, 0, 0, 0.25)", // Added shadow to enhance the text
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    color: "#4A90E2", // Updated color to a vibrant blue for a modern look
  },
  formContainer: {
    backgroundColor: "#ffffff", // White background for form
    borderRadius: 15,
    padding: 25,
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.accent500,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
    marginTop: -10,
    marginLeft: 5,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#4A90E2", // Updated color to match the title for visual consistency
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: Colors.primary600,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
  errorBar: {
    backgroundColor: "#f8d7da",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  errorText: {
    color: "#721c24",
    fontSize: 16,
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#4A90E2", // Light blue color
    textAlign: "center",
    marginTop: 20,
    opacity: 0.7, // Lightens the color slightly
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});
