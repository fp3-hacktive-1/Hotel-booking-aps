import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Home from "./screens/home";
import Detail from "./screens/detail";
import BookingList from "./screens/booking-list";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';

const stack = createNativeStackNavigator()
export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				 <NavigationContainer>
      <stack.Navigator initialRouteName='Welcome'>
        <stack.Screen name='Welcome' component={Welcome} />
        <stack.Screen name='Login' component={Login} />
        <stack.Screen name='Signup' component={Signup} />
      </stack.Navigator>
    </NavigationContainer>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
