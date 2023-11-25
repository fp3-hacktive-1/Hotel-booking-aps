import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Detail from "./screens/Detail";
import Home from "./screens/Home";
import BookingHistory from "./screens/BookingHistory";
import ChooseDate from "./screens/ChooseDate";
import BookingSummary from "./screens/BookingSummary";
import MainContainer from "./screens/MainContainer";
import Search from "./screens/Search";

import Wishlist from "./screens/WishList";
import { store, persistor } from "./store";
import Profile from "./screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainContainerTabs() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Tab.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerShown: false,
						tabBarStyle: {
							backgroundColor: "#FFFFFF",
							shadowColor: "rgba(255, 0, 0, 0.25)",
							shadowOffset: {
								width: 0,
								height: 0,
							},
						},
					}}>
					<Tab.Screen
						name="Home"
						component={Home}
						options={{
							tabBarLabel: "Home",
							tabBarIcon: ({ focused }) => (
								<View>
									<Ionicons
										name={focused ? "home" : "home-outline"}
										size={18}
										color={focused ? "blue" : "gray"}
									/>
								</View>
							),
						}}
					/>
					<Tab.Screen
						name="Wishlist"
						component={Wishlist}
						options={{
							tabBarLabel: "Wish list",
							tabBarIcon: ({ focused }) => (
								<View>
									<Ionicons
										name={focused ? "heart" : "heart-outline"}
										size={18}
										color={focused ? "red" : "gray"}
									/>
								</View>
							),
						}}
					/>
					<Tab.Screen
						name="BookingHistory"
						component={BookingHistory}
						options={{
							tabBarLabel: "Booking History",
							tabBarIcon: ({ focused }) => (
								<View>
									<Ionicons
										name={focused ? "calendar" : "calendar-outline"}
										size={18}
										color={focused ? "blue" : "gray"}
									/>
								</View>
							),
						}}
					/>
					<Tab.Screen
						name="Profile"
						component={Profile}
						options={{
							tabBarLabel: "My Profile",
							tabBarIcon: ({ focused }) => (
								<View>
									<Ionicons
										name={focused ? "person" : "person-outline"}
										size={18}
										color={focused ? "blue" : "gray"}
									/>
								</View>
							),
						}}
					/>
				</Tab.Navigator>
			</PersistGate>
		</Provider>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Welcome">
						<Stack.Screen
							name="Welcome"
							component={Welcome}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Detail" component={Detail} />
						<Stack.Screen
							name="Home"
							component={MainContainerTabs}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen name="ChooseDate" component={ChooseDate} />
						<Stack.Screen name="BookingSummary" component={BookingSummary} />
						<Stack.Screen
							name="MainContainer"
							component={MainContainer}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
