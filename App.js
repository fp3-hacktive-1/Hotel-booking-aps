import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import BookingHistory from "./screens/BookingHistory";
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
						<stack.Screen name="BookingHistory" component={BookingHistory} />
					</stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
