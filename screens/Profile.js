import { View, Text, Pressable } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/auth/authSlice";
import { useIsFocused } from "@react-navigation/core";

export default function Profile({ navigation }) {
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!isAuthenticated) {
			navigation.replace("Login");
		}
	}, [isAuthenticated, navigation, isFocused]);

	return (
		<View style={{ padding: 20, marginTop: 42 }}>
			<Text>Profile</Text>
			<Pressable onPress={() => dispatch(signOut())}>
				<Text>{isLoading ? "Loading..." : "Trigger Logout"}</Text>
			</Pressable>
		</View>
	);
}
