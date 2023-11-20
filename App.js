import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Home from "./screens/home";
import Detail from "./screens/detail";
import LoginPage from "./screens/login";
import BookingList from "./screens/booking-list";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<SafeAreaView style={styles.container}>
					<Detail />
				</SafeAreaView>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
