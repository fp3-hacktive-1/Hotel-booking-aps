import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/auth/authSlice";
import { useIsFocused } from "@react-navigation/core";
import { Avatar, TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Profile({ navigation }) {
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
	const { isAuthenticated, isLoading, user } = useSelector(
		(state) => state.auth
	);

	const handleSignOut = () => dispatch(signOut());

	useEffect(() => {
		if (!isAuthenticated) {
			navigation.replace("Login");
		}
	}, [isAuthenticated, navigation, isFocused]);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Avatar.Image
					size={140}
					source={{ uri: "https://picsum.photos/id/12/200/300" }}
				/>

				<Text style={styles.name}>{user?.username}</Text>
				<Text style={styles.bio}>{user?.email}</Text>
			</View>

			<View style={styles.menuWrapper}>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Ionicons name="person" size={24} color="black" />
						<Text style={styles.menuItemText}>Edit Profile</Text>
					</View>
				</TouchableRipple>
			</View>
			<View style={styles.menuWrapper}>
				<TouchableRipple onPress={handleSignOut}>
					<View style={styles.menuItem}>
						<MaterialIcons name="logout" size={24} color="red" />
						<Text
							style={{
								color: "red",
								marginLeft: 20,
								fontWeight: "600",
								fontSize: 16,
								lineHeight: 26,
							}}>
							Logout
						</Text>
					</View>
				</TouchableRipple>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 20,
	},
	container: {
		flex: 1,
		marginVertical: 20,
	},
	name: {
		fontSize: 25,
		fontWeight: "bold",
		marginTop: 10,
	},
	bio: {
		fontSize: 15,
		margin: 10,
		textAlign: "center",
	},

	menuWrapper: {
		flex: 1,
		fontSize: 16,
		textAlign: "left",
		marginTop: 5,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	menuItem: {
		flex: 1,
		flexDirection: "row",
		paddingVertical: 20,
		paddingHorizontal: 30,
	},

	menuItemText: {
		marginLeft: 20,
		fontWeight: "600",
		fontSize: 16,
		lineHeight: 26,
	},
});
