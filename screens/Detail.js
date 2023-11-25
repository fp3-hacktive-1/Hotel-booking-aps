import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	FlatList,
	ScrollView,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailHotel } from "../store/hotel/hotelAction";
import { booking } from "../store/hotel/hotelSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { idrFormat } from "../utils";
import ProtectedRoute from "../components/protectedRoute";

const WISHLIST_STORAGE_KEY = "wishlist";

const loadWishlistFromStorage = async () => {
	try {
		const storedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
		return storedWishlist != null ? JSON.parse(storedWishlist) : [];
	} catch (error) {
		console.error("Error loading wishlist from AsyncStorage:", error);
		return [];
	}
};

const saveWishlistToStorage = async (wishlist) => {
	try {
		const previousWishlist = await loadWishlistFromStorage();
		const updatedWishlist = [...previousWishlist, wishlist];

		await AsyncStorage.setItem(
			WISHLIST_STORAGE_KEY,
			JSON.stringify(updatedWishlist)
		);
	} catch (error) {
		console.error("Error saving wishlist to AsyncStorage:", error);
	}
};

const removeFromLocalStorage = async (wishlist) => {
	try {
		const previousWishlist = await loadWishlistFromStorage();
		const updateWishlist = previousWishlist.filter(
			(item) => item.summary.id !== wishlist.summary.id
		);

		if (previousWishlist.length !== 0) {
			await AsyncStorage.setItem(
				WISHLIST_STORAGE_KEY,
				JSON.stringify(updateWishlist)
			);
		}
	} catch (error) {
		console.error("Error saving wishlist to AsyncStorage:", error);
	}
};

export default function Detail({ route, navigation }) {
	const [content, setContent] = useState(null);
	const dispatch = useDispatch();
	const { isLoading, bookingData } = useSelector((state) => state.hotel);
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const hotelId = route.params.hotel_id;
	const [wishlistData, setWishlistData] = useState([]);

	const isAlreadyWishlist = wishlistData.find(
		(item) => item?.summary?.id === content?.summary?.id
	);

	const handleGetDetailHotel = async () => {
		await dispatch(fetchDetailHotel(hotelId))
			.then((res) => {
				if (res.meta.requestStatus !== "fulfilled") {
					return;
				}
				setContent(res.payload);
			})
			.catch((err) => console.log(err));
		//	await AsyncStorage.removeItem(WISHLIST_STORAGE_KEY);
	};

	const handleBookHotel = () => {
		dispatch(
			booking({
				hotel: content,
				checkInDate: "2023- 11-20",
				checkOutDate: "2023-11-25",
				user,
			})
		);
	};

	const handleAddWishList = () => {
		saveWishlistToStorage({
			...content,
			price: route.params.price,
		});
		Alert.alert("success add to wish list");
	};

	const handleRemoveWishList = () => {
		removeFromLocalStorage(content);
		Alert.alert("success remove to wish list");
	};

	const handleGetWishlist = async () => {
		await loadWishlistFromStorage().then((res) => {
			res != null ? setWishlistData(res) : [];
		});
	};

	useEffect(() => {
		handleGetWishlist();
		handleGetDetailHotel();
	}, []);

	return (
		<View>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<ScrollView>
					<View>
						<Image
							style={{ height: 300 }}
							source={{
								uri: content?.propertyGallery.images[0].image.url,
							}}
						/>
						<View style={{ paddingHorizontal: 15, marginTop: 32 }}>
							<View
								style={{
									flexDirection: "row",
									gap: 12,
									alignItems: "center",
									justifyContent: "space-between",
								}}>
								<Text style={{ fontSize: 16, fontWeight: "700", width: 300 }}>
									{content?.summary.name}
									{isAuthenticated ? "loged" : "not"}
								</Text>
								<Pressable
									onPress={() => {
										isAlreadyWishlist
											? handleRemoveWishList()
											: handleAddWishList();
									}}>
									<Ionicons
										name={isAlreadyWishlist ? "heart" : "heart-outline"}
										color="red"
										style={{ fontSize: 20 }}
									/>
								</Pressable>
							</View>
							<View
								style={{
									marginTop: 9,
									flexDirection: "row",
									alignItems: "center",
									gap: 5,
									backgroundColor: "#007EF21F",
									paddingHorizontal: 9,
									paddingVertical: 6,
									borderRadius: 10,
									width: 143,
								}}>
								<Ionicons name="star" color="#FFD700" />
								<Text
									style={{
										color: "#007EF2",
										fontSize: 12,
										fontWeight: "400",
									}}>
									{content?.summary.overview.propertyRating.rating} ( 120
									Reviews)
								</Text>
							</View>
							<View
								style={{
									marginTop: 5,
									marginBottom: 8,
									flexDirection: "row",
									alignItems: "center",
									gap: 3,
								}}>
								<Ionicons name="location-outline" />
								<Text style={{ color: "#7F7F7F", fontSize: 10 }}>
									{content?.summary.location.address.addressLine}
								</Text>
							</View>
							<Text style={styles.submenu_title}>Description</Text>
							<Text style={styles.submenu_content}>
								{content?.summary.location.whatsAround.editorial.content}
							</Text>
							<Text style={styles.submenu_title}>Galery</Text>
							<FlatList
								style={{ marginTop: 12 }}
								horizontal
								data={content?.propertyGallery.images}
								ItemSeparatorComponent={<View style={{ width: 12 }}></View>}
								renderItem={({ item }) => (
									<Image
										style={{ width: 100, height: 100 }}
										source={{
											uri: item.image.url,
										}}
									/>
								)}
							/>
							<Text style={styles.submenu_title}>Facilities</Text>
							<View
								style={{
									marginTop: 12,
									flexDirection: "row",
									flexWrap: "wrap",
									justifyContent: "space-between",
									rowGap: 12,
								}}>
								{content?.summary.amenities.topAmenities.items.map((item) => (
									<View
										style={{
											width: 100,
										}}>
										<Ionicons name={item.icon.id} />
										<Text style={{ marginTop: 5 }}>{item.text}</Text>
									</View>
								))}
							</View>

							<Text style={styles.submenu_title}>Location</Text>
							<MapView style={{ height: 200, marginTop: 12 }}>
								<Marker
									coordinate={{
										latitude: content?.summary.location.coordinates.latitude,
										longitude: content?.summary.location.coordinates.longitude,
									}}
								/>
							</MapView>
							<View
								style={{
									height: 1,
									backgroundColor: "#00000040",
									marginTop: 26,
								}}></View>
							<View
								style={{
									marginTop: 12,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: 20,
									gap: 60,
								}}>
								<View>
									<Text
										style={{
											color: "#007EF2",
											fontSize: 18,
											fontWeight: "700",
										}}>
										{idrFormat(route.params.price)}
									</Text>
									<Text
										style={{
											color: "#000000CF",
											fontWeight: "300",
											fontSize: 16,
										}}>
										/night
									</Text>
								</View>
								<Pressable
									style={{
										padding: 16,
										borderRadius: 10,
										backgroundColor: "#007EF2",
									}}
									onPress={() => {
										if (isAuthenticated) {
											navigation.navigate("ChooseDate", {
												hotel: {
													id: content?.summary.id,
													image: content?.propertyGallery.images[8].image.url,
													address:
														content?.summary.location.address.addressLine,
													price: route.params.price,
													name: content?.summary.name,
												},
											});
										} else {
											navigation.navigate("Login");
										}
									}}>
									<Text
										style={{
											color: "#fff",
											fontSize: 18,
											fontWeight: "600",
										}}>
										BOOK NOW
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	submenu_title: {
		fontSize: 16,
		fontWeight: "700",
		marginTop: 26,
	},
	submenu_content: {
		fontSize: 10,
		fontWeight: "500",
		color: "#7F7F7F",
		marginTop: 12,
	},
});
