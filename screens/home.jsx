import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fetchHotels } from "../store/hotel/hotelAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
	const dispatch = useDispatch();
	const { data, isLoading } = useSelector((state) => state.hotel);

	const handleGetHotels = async () => {
		dispatch(fetchHotels());
	};

	useEffect(() => {
		handleGetHotels();
	}, []);

	return (
		<View style={styles.container}>
			<Text>
				final project 3 {isLoading ? "loading..." : JSON.stringify(data)}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
