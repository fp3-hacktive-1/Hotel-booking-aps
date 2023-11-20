import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingList = () => {
	const getBookingList = () => {
		try {
			const bookingListById = AsyncStorage.getItem("bookinglist");
			console.log(bookingListById);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBookingList();
	}, []);

	return (
		<View>
			<Text>BookingList</Text>
		</View>
	);
};

export default BookingList;

const styles = StyleSheet.create({});
