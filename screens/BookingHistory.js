import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProtectedRoute from "../components/protectedRoute";
import { useSelector } from "react-redux";

const BookingList = () => {
	const [content, setContent] = useState(null);
	const { user } = useSelector((state) => state.auth);
	const getBookingList = async () => {
		try {
			const bookingListById = await AsyncStorage.getItem("booking");
			console.log(JSON.parse(bookingListById));
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
	}, []);

	return (
		<ProtectedRoute>
			<View>
				<Text>
					BookingList
					{content && JSON.stringify(content)}
				</Text>
			</View>
		</ProtectedRoute>
	);
};

export default BookingList;

const styles = StyleSheet.create({});
