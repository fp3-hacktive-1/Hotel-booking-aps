import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProtectedRoute from "../components/protectedRoute";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/core";

const BookingList = ({ navigation }) => {
	const isFocused = useIsFocused();
	const [content, setContent] = useState([]);
	const { user } = useSelector((state) => state.auth);
	const getBookingList = async () => {
		try {
			const bookingListById = await AsyncStorage.getItem("booking");
			if (bookingListById != null) {
				const bookingDataUser = JSON.parse(bookingListById).filter(
					(item) => item.user.id === user.id
				);
				setContent(bookingDataUser);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBookingList();
	}, [isFocused]);

	return (
		<ProtectedRoute>
			<View style={{ marginTop: 42, padding: 20 }}>
				<Text style={{ fontSize: 24, marginBottom: 20 }}>Booking History</Text>
				{content.length === 0 ? (
					<Text>Booking History is Empty</Text>
				) : (
					<FlatList
						data={content}
						ItemSeparatorComponent={<View style={{ height: 12 }} />}
						renderItem={({ item }) => (
							<View
								style={{
									backgroundColor: "#fff",
									height: 300,
									padding: 20,
									borderRadius: 11,
								}}>
								<View
									style={{
										flexDirection: "row",
										gap: 15,
										alignItems: "center",
									}}>
									<Image
										style={{ width: 100, height: 100, borderRadius: 10 }}
										source={{
											uri: item?.hotel.image,
										}}
									/>
									<View style={{ width: 200 }}>
										<Text style={{ fontWeight: "700", fontSize: 17 }}>
											{item.hotel.name}
										</Text>
										<Text
											style={{
												marginTop: 12,
												fontWeight: "400",
												fontSize: 14,
											}}>
											{item.hotel.address}
										</Text>
									</View>
								</View>
								<View
									style={{ height: 1, backgroundColor: "gray", marginTop: 16 }}
								/>
								<View
									style={{
										flexDirection: "row",
										gap: 20,
										flexWrap: "wrap",
										marginTop: 16,
									}}>
									<View>
										<Text style={styles.bookingInfoTitle}>Booking Date</Text>
										<Text style={styles.bookingInfoValue}>
											{item.booking.bookingDate}
										</Text>
									</View>
									<View>
										<Text style={styles.bookingInfoTitle}>Check In Date</Text>
										<Text style={styles.bookingInfoValue}>
											{item.booking.checkInDate}
										</Text>
									</View>
									<View>
										<Text style={styles.bookingInfoTitle}>Check Out Date</Text>
										<Text style={styles.bookingInfoValue}>
											{item.booking.checkOutDate}
										</Text>
									</View>
									<View>
										<Text style={styles.bookingInfoTitle}>Guest</Text>
										<Text style={styles.bookingInfoValue}>
											{item.booking.guest}
										</Text>
									</View>
									<View>
										<Text style={styles.bookingInfoTitle}>Room(s)</Text>
										<Text style={styles.bookingInfoValue}>
											{item.booking.room}
										</Text>
									</View>
									<View>
										<Text style={styles.bookingInfoTitle}>Total</Text>
										<Text style={styles.bookingInfoValue}>{item.total}</Text>
									</View>
								</View>
							</View>
						)}
						key={({ item }) => item.hotel.id}
					/>
				)}
			</View>
		</ProtectedRoute>
	);
};

export default BookingList;

const styles = StyleSheet.create({
	bookingInfoTitle: {
		fontWeight: "700",
	},
	bookingInfoValue: {
		fontSize: 12,
		fontWeight: "300,",
		marginTop: 8,
	},
});
