import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import { FontAwesome } from "@expo/vector-icons";
import { QrListContext } from "./src/Context/QrListContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QrListScreen from "./src/screens/QrListScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [qrList, setQrList] = React.useState([]);
  React.useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      setQrList(currentUser);
      console.log("Get Data", qrList);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (newList) => {
    setQrList(newList);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(newList));
      getUser();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NavigationContainer>
      <QrListContext.Provider
        value={{ qrList, setQrList, getUser, deleteUser }}
      >
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: (color, size) => (
                <FontAwesome name="home" size={24} color="blue" />
              ),
            }}
          />
          <Tab.Screen
            name="QR's-List"
            component={QrListScreen}
            options={{
              tabBarLabel: "History",
              tabBarIcon: (color, size) => (
                <FontAwesome name="history" size={24} color="red" />
              ),
            }}
          />
        </Tab.Navigator>
      </QrListContext.Provider>
    </NavigationContainer>
  );
}
