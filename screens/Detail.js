import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailHotel } from "../store/hotel/hotelAction";
import { booking } from "../store/hotel/hotelSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail({ route }) {
	const [content, setContent] = useState(null);
	const dispatch = useDispatch();
	const { isLoading, bookingData } = useSelector((state) => state.hotel);
	const hotelId = route.params.hotel_id;

	const { user } = useSelector((state) => state.auth);

	const handleGetDetailHotel = async () => {
		await dispatch(fetchDetailHotel(hotelId))
			.then((res) => {
				if (res.meta.requestStatus !== "fulfilled") {
					return;
				}
				setContent(res.payload);
			})
			.catch((err) => console.log(err));
	};

	const handleBookHotel = () => {
		dispatch(
			booking({
				hotel: content,
				checkInDate: "2023-11-20",
				checkOutDate: "2023-11-25",
				user,
			})
		);
	};

	useEffect(() => {
		handleGetDetailHotel();
	}, []);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<Text>detail {JSON.stringify(user)} </Text>
					<View>
						<Text>{content?.summary?.name}</Text>
						<Pressable onPress={handleBookHotel}>
							<Text>Booking Trigger</Text>
						</Pressable>
					</View>
				</View>
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
});
