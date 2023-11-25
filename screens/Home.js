import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ScrollView,
	TextInput,
} from "react-native";
import { fetchHotels } from "../store/hotel/hotelAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import HotelCard from "../components/hotel-card";

export default function App({ navigation }) {
	const dispatch = useDispatch();

	const [allHotel, setAllHotel] = useState();
	const [isSearching, setIsSearching] = useState(false);
	const [searchResult, setSearchResult] = useState();

	const [soloHotel, setSoloHotel] = useState(null);
	const [baliHotel, setBaliHotel] = useState(null);
	const [jakartaHotel, setJakartaHotel] = useState(null);
	const { isLoading } = useSelector((state) => state.hotel);
	const onSearching = (event) => {
		const _resultSearch = allHotel.filter((hotel) =>
			hotel.name?.toLocaleLowerCase().includes(event.toLocaleLowerCase())
		);
		setSearchResult(_resultSearch);
		setIsSearching(true);
		if (event === "") {
			setIsSearching(false);
			setSearchResult(allHotel);
		}
	};

	const handleGetHotels = async () => {
		const [soloData, baliData, jakartaData] = await Promise.all([
			dispatch(
				fetchHotels({
					regionId: "500660",
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
		console.log(soloData.payload.properties);
		console.log(jakartaData.payload.properties);
		console.log(baliData.payload.properties);
		setSoloHotel(soloData.payload.properties);
		setBaliHotel(baliData.payload.properties);
		setJakartaHotel(jakartaData.payload.properties);
		setAllHotel([
			...soloData.payload.properties,
			...jakartaData.payload.properties,
			...baliData.payload.properties,
		]);
	};

	useEffect(() => {
		handleGetHotels();
	}, []);

	return (
		<View
			style={{
				marginTop: 24,
				backgroundColor: "#F5FAFE",
				flex: 1,
			}}>
			<View
				style={{
					padding: 20,
					flexDirection: "row",
					alignItems: "center",
					position: "relative",
				}}>
				<Ionicons
					name="search-outline"
					style={{
						fontSize: 24,
						position: "absolute",
						left: 32,
					}}
				/>
				<TextInput
					style={{
						borderColor: "#7F7F7F",
						borderRadius: 10,
						height: 53,
						borderWidth: 1,
						padding: 10,
						fontSize: 18,
						paddingLeft: 50,
						width: "100%",
					}}
					onChangeText={onSearching}
					placeholder="Search Hotel"
				/>
			</View>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<ScrollView>
					{isSearching ? (
						<View style={{ padding: 20 }}>
							{searchResult.length === 0 ? (
								<Text>No Hotel Found</Text>
							) : (
								<View>
									<Text
										style={{
											color: "#007EF2",
											fontSize: 20,
											fontWeight: "700",
										}}>
										Search Result
									</Text>
									<FlatList
										style={{ marginTop: 24 }}
										horizontal
										ItemSeparatorComponent={<View style={{ width: 17 }}></View>}
										data={searchResult}
										renderItem={({ item }) => (
											<HotelCard
												key={item.id}
												hotel={item}
												navigation={navigation}
											/>
										)}
										keyExtractor={(item) => item.id}
									/>
								</View>
							)}
						</View>
					) : (
						<View style={{ padding: 20 }}>
							<Text
								style={{
									color: "#007EF2",
									fontSize: 20,
									fontWeight: "700",
								}}>
								Hotel In Solo
							</Text>
							<FlatList
								style={{ marginTop: 24 }}
								horizontal
								ItemSeparatorComponent={<View style={{ width: 17 }}></View>}
								data={soloHotel}
								renderItem={({ item }) => (
									<HotelCard
										key={item.id}
										hotel={item}
										navigation={navigation}
									/>
								)}
								keyExtractor={(item) => item.id}
							/>
							<Text
								style={{
									color: "#007EF2",
									fontSize: 20,
									fontWeight: "700",
									marginTop: 26,
								}}>
								Hotel In Jakarta
							</Text>
							<FlatList
								data={jakartaHotel}
								style={{ marginTop: 24 }}
								horizontal
								ItemSeparatorComponent={<View style={{ width: 17 }}></View>}
								renderItem={({ item }) => (
									<HotelCard
										key={item.id}
										hotel={item}
										navigation={navigation}
									/>
								)}
								keyExtractor={(item) => item.id}
							/>
							<Text
								style={{
									color: "#007EF2",
									fontSize: 20,
									fontWeight: "700",
									marginTop: 26,
								}}>
								Hotel In Bali
							</Text>
							<FlatList
								data={baliHotel}
								style={{ marginTop: 24 }}
								horizontal
								ItemSeparatorComponent={<View style={{ width: 17 }}></View>}
								renderItem={({ item }) => (
									<HotelCard
										key={item.id}
										hotel={item}
										navigation={navigation}
									/>
								)}
								keyExtractor={(item) => item.id}
							/>
						</View>
					)}
				</ScrollView>
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
