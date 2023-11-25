import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { idrFormat } from "../utils";

const HotelCard = ({ hotel, navigation }) => {
	return (
		<Pressable
			onPress={() =>
				navigation.navigate("Detail", {
					hotel_id: hotel?.id,
					price: hotel?.price.lead.amount,
				})
			}
			style={{
				paddingVertical: 15,
				paddingHorizontal: 8,
				backgroundColor: "#fff",
				borderRadius: 10,
			}}>
			<Image
				style={{
					width: 200,
					height: 150,
					borderRadius: 10,
					borderColor: "#FFD700",
					borderWidth: 1,
				}}
				source={{
					uri: hotel?.propertyImage.image.url,
				}}
			/>
			<View
				style={{
					marginTop: 9,
					flexDirection: "row",
					alignItems: "center",
					gap: 5,
					backgroundColor: "#007EF21F",
					paddingHorizontal: 9,
					paddingVertical: 6,
					borderRadius: 10,
					width: 52,
				}}>
				<Ionicons name="star" color="#FFD700" />
				<Text
					style={{
						color: "#007EF2",
						fontSize: 9,
					}}>
					{hotel?.star}
				</Text>
			</View>
			<Text
				style={{ fontSize: 14, fontWeight: "700", marginTop: 11, width: 180 }}>
				{hotel?.name ? hotel.name : "Not Found"}
			</Text>
			<View
				style={{
					marginTop: 5,
					marginBottom: 8,
					flexDirection: "row",
					alignItems: "center",
					gap: 3,
				}}>
				<Ionicons name="location-outline" />
				<Text style={{ color: "#7F7F7F", fontSize: 10 }}>
					{hotel?.neighborhood?.name ? hotel.neighborhood.name : "Not Found"}
				</Text>
			</View>
			<Text
				style={{
					color: "#007EF2",
					fontSize: 10,
					fontWeight: "700",
				}}>
				{idrFormat(hotel?.price.lead.amount)}
				<Text
					style={{
						color: "#000000CF",
						fontWeight: 300,
					}}>
					/night
				</Text>
			</Text>
		</Pressable>
	);
};

export default HotelCard;
