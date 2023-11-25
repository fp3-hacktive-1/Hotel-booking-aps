import {
	View,
	Text,
	Button,
	TextInput,
	Alert,
	StyleSheet,
	Pressable,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { calculateDaysBetweenDates } from "../utils";

const ChooseDate = ({ route, navigation }) => {
	const [checkInDate, setCheckInDate] = useState(new Date());
	const [checkOutDate, setCheckOutDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isCheckOutDateActive, setisCheckOutDateActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [guest, setGuest] = useState(1);
	const [room, setRoom] = useState(1);

	const increment = (type) => {
		if (type === "increment-guest") {
			setGuest((prev) => prev + 1);
		} else {
			setRoom((prev) => prev + 1);
		}
	};

	const decrement = (type) => {
		if (type === "decrement-guest") {
			setGuest((prev) => prev - 1);
		} else {
			setRoom((prev) => prev - 1);
		}
	};

	const showDatepicker = () => {
		setShowDatePicker(true);
	};

	const showCheckOutDate = () => {
		setisCheckOutDateActive(true);
	};

	const onChange = (event, selectedDate) => {
		setShowDatePicker(Platform.OS === "ios");
		setisCheckOutDateActive(Platform.OS === "ios");

		if (isCheckOutDateActive) {
			setCheckOutDate(selectedDate);
		} else {
			setCheckInDate(selectedDate);
		}
	};

	const formatDate = (date) => date.toLocaleDateString();

	const continueBooking = () => {
		if (checkInDate < checkOutDate) {
			setIsLoading(true);
			setTimeout(() => {
				setIsLoading(false);
				navigation.replace("BookingSummary", {
					hotel: route.params.hotel,
					bookingInfo: {
						room,
						guest,
						checkInDate: formatDate(checkInDate),
						checkOutDate: formatDate(checkOutDate),
						bookingDate: formatDate(new Date()),
						ammountDay: calculateDaysBetweenDates(checkInDate, checkOutDate),
					},
				});
			}, 2000);
		} else if (checkOutDate < checkInDate) {
			Alert.alert("Checkout date cannot be earlier than check-in date");
		} else {
			Alert.alert("Check-in and check-out dates cannot be the same");
		}
	};

	return (
		<>
			{isLoading ? (
				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<ActivityIndicator size="large" />
					<Text style={{ marginTop: 20, fontSize: 18, fontWeight: "500" }}>
						Proccessing
					</Text>
				</View>
			) : (
				<View style={{ padding: 20 }}>
					<Text>ChooseDate</Text>
					<View
						style={{
							justifyContent: "space-between",
							flexDirection: "row",
							gap: 21,
						}}>
						<View>
							<Text>Check In</Text>
							<Pressable style={styles.inputContainer} onPress={showDatepicker}>
								<TextInput
									placeholder="YYYY/MM/DD"
									value={formatDate(checkInDate)}
								/>
								<Ionicons name="calendar-outline" style={{ fontSize: 18 }} />
							</Pressable>
						</View>
						<View>
							<Text>Check Out</Text>
							<Pressable
								style={styles.inputContainer}
								onPress={showCheckOutDate}>
								<TextInput
									placeholder="YYYY/MM/DD"
									value={formatDate(checkOutDate)}
								/>
								<Ionicons name="calendar-outline" style={{ fontSize: 18 }} />
							</Pressable>
						</View>
					</View>
					<View
						style={{
							marginTop: 28,
							justifyContent: "space-between",
							flexDirection: "row",
							gap: 21,
						}}>
						<View>
							<Text>Guest</Text>
							<View
								style={{
									width: 140,
								}}>
								<View style={styles.inputContainer}>
									<Ionicons
										onPress={() => increment("increment-guest")}
										name="add-outline"
										style={{ fontSize: 18 }}
									/>
									<TextInput
										placeholder=""
										keyboardType="numeric"
										value={String(guest)}
									/>
									<Ionicons
										onPress={() => decrement("decrement-guest")}
										name="remove-outline"
										style={{ fontSize: 18 }}
									/>
								</View>
							</View>
						</View>
						<View
							style={{
								width: 140,
							}}>
							<Text>Room</Text>
							<View style={styles.inputContainer}>
								<Ionicons
									onPress={() => increment("increment-room")}
									name="add-outline"
									style={{ fontSize: 18 }}
								/>
								<TextInput
									placeholder=""
									keyboardType="numeric"
									value={String(room)}
								/>
								<Ionicons
									onPress={() => decrement("decrement-room")}
									name="remove-outline"
									style={{ fontSize: 18 }}
								/>
							</View>
						</View>
					</View>

					<Pressable
						style={{
							marginTop: 32,
							backgroundColor: "#007EF2",
							borderRadius: 10,
							paddingVertical: 10,
							alignItems: "center",
						}}
						onPress={continueBooking}>
						<Text
							style={{
								color: "#fff",
								fontSize: 18,
								fontWeight: "600",
							}}>
							CONTINUE ORDER
						</Text>
					</Pressable>
					{showDatePicker && (
						<DateTimePicker
							value={checkInDate}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={onChange}
							minimumDate={new Date()}
						/>
					)}
					{isCheckOutDateActive && (
						<DateTimePicker
							value={checkOutDate}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={onChange}
							minimumDate={new Date()}
						/>
					)}
				</View>
			)}
		</>
	);
};

export default ChooseDate;

const styles = StyleSheet.create({
	inputContainer: {
		marginTop: 10,
		borderColor: "#7F7F7F",
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},
});
