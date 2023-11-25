import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import BookingHistory from "./screens/BookingHistory";
import ChooseDate from "./screens/ChooseDate";
import BookingSummary from "./screens/BookingSummary";
import BookingList from "./screens/BookingHistory";
import WishList from "./screens/WishList";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Welcome from "./screens/Welcome";

const stack = createNativeStackNavigator();
export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<NavigationContainer>
					<stack.Navigator initialRouteName="Welcome">
						<stack.Screen
							name="Welcome"
							component={Welcome}
							options={{
								headerShown: false,
							}}
						/>
						<stack.Screen name="Login" component={Login} />
						<stack.Screen name="Signup" component={Signup} />
						<stack.Screen name="Detail" component={Detail} />
						<stack.Screen name="Home" component={Home} />
						<stack.Screen name="ChooseDate" component={ChooseDate} />
						<stack.Screen name="BookingSummary" component={BookingSummary} />
						<stack.Screen name="BookingHistory" component={BookingList} />
						<stack.Screen name="WishList" component={WishList} />
					</stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
