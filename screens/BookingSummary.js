import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { idrFormat } from "../utils";
import ProtectedRoute from "../components/protectedRoute";
import { saveBooking } from "../utils";
import { useSelector } from "react-redux";

const BookingSummary = ({ route, navigation }) => {
	const hotel = route.params.hotel;
	const booking = route.params.bookingInfo;
	const { user } = useSelector((state) => state.auth);

	const handleSaveBooking = async () => {
		await saveBooking({
			hotel,
			booking,
			user,
		}).then(() => navigation.navigate("BookingHistory"));
	};

	return (
		<ProtectedRoute>
			<View style={{ padding: 20 }}>
				<View
					style={{
						flexDirection: "row",
						gap: 17,
						alignItems: "center",
						marginBottom: 45,
					}}>
					<Image
						style={{
							width: 110,
							height: 70,
							borderColor: "#FFD700",
							borderWidth: 1,
							borderRadius: 10,
						}}
						source={{
							uri: hotel.image,
						}}
					/>
					<View style={{ gap: 7 }}>
						<Text style={{ fontSize: 16, fontWeight: "700", width: 200 }}>
							{hotel.name}
						</Text>
						<Text style={{ fontSize: 10, color: "#7F7F7F", width: 200 }}>
							{hotel.address}
						</Text>
						<Text style={{ color: "#007EF2", fontSize: 16, fontWeight: "700" }}>
							{idrFormat(hotel.price)}
							<Text style={{ color: "#000000CF", fontWeight: "300" }}>
								/night
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<Text>Booking Date</Text>
					<Text>{booking.bookingDate}</Text>
				</View>
				<View style={styles.row}>
					<Text>Check In</Text>
					<Text>{booking.checkInDate}</Text>
				</View>
				<View style={styles.row}>
					<Text>Check Out</Text>
					<Text>{booking.checkOutDate}</Text>
				</View>
				<View style={styles.row}>
					<Text>Guest</Text>
					<Text>{booking.guest}</Text>
				</View>
				<View style={styles.row}>
					<Text>Room(s)</Text>
					<Text>{booking.room}</Text>
				</View>
				<View
					style={{
						height: 1,
						backgroundColor: "black",
						marginTop: 45,
						marginBottom: 32,
					}}
				/>
				<View style={styles.row}>
					<Text>Amount</Text>
					<Text>
						{idrFormat(hotel.price)} x {booking.ammountDay}
					</Text>
				</View>
				<View style={styles.row}>
					<Text>Tax</Text>
					<Text>
						{idrFormat(Number(hotel.price * (10 / 100)) * booking.ammountDay)}
					</Text>
				</View>
				<View style={styles.row}>
					<Text>Total</Text>
					<Text>
						{" "}
						{idrFormat(
							Number(hotel.price) * booking.ammountDay +
								Number(hotel.price * (10 / 100)) * booking.ammountDay
						)}
					</Text>
				</View>
				<Pressable
					style={{
						marginTop: 32,
						backgroundColor: "#007EF2",
						borderRadius: 10,
						paddingVertical: 10,
						alignItems: "center",
					}}
					onPress={handleSaveBooking}>
					<Text
						style={{
							color: "#fff",
							fontSize: 18,
							fontWeight: "600",
						}}>
						CONTINUE TO PAYMENT
					</Text>
				</Pressable>
			</View>
		</ProtectedRoute>
	);
};

export default BookingSummary;

const styles = StyleSheet.create({
	row: {
		marginBottom: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
