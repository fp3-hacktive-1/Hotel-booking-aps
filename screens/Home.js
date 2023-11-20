import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { fetchHotels } from "../store/hotel/hotelAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App({ navigation }) {
	const dispatch = useDispatch();
	const [soloHotel, setSoloHotel] = useState();
	const [baliHotel, setBaliHotel] = useState();
	const [jakartaHotel, setJakartaHotel] = useState();
	const { isLoading } = useSelector((state) => state.hotel);

	const handleGetHotels = async () => {
		const [soloData, baliData, jakartaData] = await Promise.all([
			dispatch(
				fetchHotels({
					regionId: "159522",
				})
			),
			dispatch(
				fetchHotels({
					regionId: "602651",
				})
			),
			dispatch(
				fetchHotels({
					regionId: "1704",
				})
			),
		]);
		setSoloHotel(soloData.payload.properties);
		setBaliHotel(baliData.payload.properties);
		setJakartaHotel(jakartaData.payload.properties);
	};

	useEffect(() => {
		handleGetHotels();
	}, []);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<Text>Hotel In Solo</Text>
					<FlatList
						data={soloHotel?.slice(0, 3)}
						renderItem={({ item }) => (
							<View>
								<Text>{item.name}</Text>
								<Pressable
									onPress={() =>
										navigation.navigate("Detail", {
											hotel_id: item.id,
										})
									}>
									<Text>Detail Hotel</Text>
								</Pressable>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
					<Text>Hotel In Bali</Text>
					<FlatList
						data={baliHotel?.slice(0, 3)}
						renderItem={({ item }) => (
							<View>
								<Text>{item.name}</Text>
								<Pressable
									onPress={() =>
										navigation.navigate("Detail", {
											hotel_id: item.id,
										})
									}>
									<Text>Detail Hotel</Text>
								</Pressable>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
					<Text>Hotel In Jakarta</Text>
					<FlatList
						data={jakartaHotel?.slice(0, 3)}
						renderItem={({ item }) => (
							<View>
								<Text>{item.name}</Text>
								<Pressable
									onPress={() =>
										navigation.navigate("Detail", {
											hotel_id: item.id,
										})
									}>
									<Text>Detail Hotel</Text>
								</Pressable>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
});
