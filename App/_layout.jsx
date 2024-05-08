import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Homescreen from "./pages/Homescreen";
// import Stat from "./pages/Stat";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView />
        <Drawer.Navigator initialRouteName="Accueil">
          <Drawer.Screen name="Accueil" component={Homescreen} />
          {/* <Drawer.Screen name="Statistiques" component={Stat} /> */}
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
