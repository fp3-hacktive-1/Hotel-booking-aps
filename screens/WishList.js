import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import HotelCard from "../components/hotel-card-wish-list";
import { useIsFocused } from "@react-navigation/core";

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

const WishList = ({ navigation }) => {
	const isFocused = useIsFocused();
	const [content, setContent] = useState([]);

	const handleGetWishlist = async () => {
		await loadWishlistFromStorage().then((res) => {
			res != null ? setContent(res) : null;
		});
	};

	useEffect(() => {
		handleGetWishlist();
	}, [isFocused]);

	return (
		<View style={{ padding: 20, alignItems: "center", marginTop: 24 }}>
			<Text style={{ fontSize: 24 }}>Your Wish List Hotels</Text>
			{content?.length === 0 ? (
				<Text>Wish List Empty</Text>
			) : (
				<FlatList
					data={content}
					renderItem={({ item }) => (
						<View style={{ marginTop: 20 }}>
							<HotelCard key={item.id} hotel={item} navigation={navigation} />
						</View>
					)}
					keyExtractor={(item) => item.summary.id}
				/>
			)}
		</View>
	);
};

export default WishList;
