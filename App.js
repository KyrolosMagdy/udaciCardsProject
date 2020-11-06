import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// pages
import AddQuestion from "./pages/AddQuestion";
import Quiz from "./pages/TakeQuiz";
import Decks from "./pages/Decks";
import AddDecks from "./pages/AddDecks";
import DeckInfo from "./pages/DeckInfo";

// colors
import { white, gray, purple, orange, black } from "./utils/colors";

//icons
import { Entypo } from "@expo/vector-icons";

// redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Redux/reducers";

//notifications
import { setLocalNotification } from "./utils/helpers";

const Tab = createMaterialBottomTabNavigator();
function TabNaviagtor() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: white,
        inactiveTintColor: gray,
        style: {
          backgroundColor: purple,
        },
        tabStyle: { height: 54 },
        indicatorStyle: { backgroundColor: orange },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Decks") {
            iconName = "list";
          } else if (route.name === "AddDecks") {
            iconName = "add-to-list";
          }
          return <Entypo name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="AddDecks" component={AddDecks} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNaviagtor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => {
          return {
            title: "Quiz",
            headerTintColor: white,
            headerStyle: { backgroundColor: purple },
          };
        }}
      />
      <Stack.Screen
        name="DeckInfo"
        component={DeckInfo}
        options={({ route }) => {
          return {
            title: "DeckInfo",
            headerTintColor: white,
            headerStyle: { backgroundColor: purple },
          };
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddQuestion}
        options={{
          headerTintColor: white,
          headerStyle: { backgroundColor: purple },
        }}
      />
    </Stack.Navigator>
  );
}

const AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View
      style={{
        backgroundColor,
        height: Constants.statusBarHeight,
      }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={purple} />
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
