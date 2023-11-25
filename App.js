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

import { store, persistor } from "./store";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainContainerTabs() {
	return (
		<Tab.Navigator initialRouteName="Home">
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Search" component={Search} />
			<Tab.Screen name="BookingHistory" component={BookingHistory} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
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
						<Stack.Screen name="Home" component={MainContainerTabs} />
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
