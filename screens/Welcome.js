import { View, Text, Pressable, Image } from "react-native";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { useSelector } from "react-redux";

const Welcome = ({ navigation }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			navigation.replace("Home");
		}
	}, [navigation, isAuthenticated]);

	return (
		<LinearGradient
			style={{
				flex: 1,
			}}
			colors={[COLORS.primary, COLORS.secondary]}>
			<View></View>
			<View style={{ flex: 1 }}>
				<View></View>
				<View
					style={{
						paddingHorizontal: 22,
						position: "absolute",
						top: 350,
						width: "100%",
					}}>
					<Text
						style={{
							fontSize: 50,
							fontWeight: 800,
							color: COLORS.white,
						}}>
						Unleash Your Inner Traveller
					</Text>

					<View style={{ marginVertical: 22 }}>
						<Text
							style={{
								fontSize: 16,
								color: COLORS.white,
								marginVertical: 4,
							}}>
							Your passport to a world of extraordinary hotel experiences. Join
							us today and unlock a realm of comfort, luxury, and adventure.
						</Text>
					</View>

					<Button
						title="Start Exploring"
						onPress={() => navigation.navigate("Home")}
						style={{
							marginTop: 22,
							width: "100%",
						}}
					/>

					<View
						style={{
							flexDirection: "row",
							marginTop: 12,
							justifyContent: "center",
						}}>
						<Text
							style={{
								fontSize: 16,
								color: COLORS.white,
							}}>
							Already have an account ?
						</Text>
						<Pressable onPress={() => navigation.navigate("Login")}>
							<Text
								style={{
									fontSize: 16,
									color: COLORS.white,
									fontWeight: "bold",
									marginLeft: 4,
								}}>
								Login
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</LinearGradient>
	);
};

export default Welcome;
