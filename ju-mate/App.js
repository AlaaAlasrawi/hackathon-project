import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import AuthComponent from "./features/auth/Auth";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeComponent from "./features/home/Home";
import ProfileComponent from "./features/profile/Profile";
import DisabilityRequests from "./features/disability/DisabilityRequests";
import CampusLinkGroups from "./features/campusLink/CampusLinkGroups";
import CampusLinkPartners from "./features/campusLink/CampusLinkPartners";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.rootScreen}>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DisabilityRequests"
            component={DisabilityRequests}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CampusLinkGroups"
            component={CampusLinkGroups}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CampusLinkPartners"
            component={CampusLinkPartners}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
