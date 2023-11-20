import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../store/auth/authAction";

const LoginPage = () => {
	const dispatch = useDispatch();
	const { isLoading, user, isAuthenticated } = useSelector(
		(state) => state.auth
	);

	const handleLogin = async () => {
		dispatch(
			signIn({
				email: "developer@gmail.com",
				password: 123456,
			})
		);
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Text>LoginPage </Text>
			<Pressable
				style={{
					backgroundColor: "red",
					padding: 8,
				}}
				onPress={handleLogin}>
				<Text>Trigger Login </Text>
			</Pressable>
			{isAuthenticated && <Text>Welcome, {user.username}</Text>}
			{isLoading && <Text>loading...</Text>}
		</View>
	);
};

export default LoginPage;

const styles = StyleSheet.create({});
