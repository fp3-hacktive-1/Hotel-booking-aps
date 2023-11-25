import {
	View,
	Text,
	Image,
	Pressable,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/auth/authAction";

const Login = ({ navigation }) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [loginPayload, setLoginPayload] = useState({
		email: "",
		password: "",
	});

	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);

	const handleLogin = async () => {
		dispatch(
			signIn({
				email: loginPayload.email,
				password: loginPayload.password,
			})
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<View style={{ flex: 1, marginHorizontal: 22 }}>
				<View style={{ marginVertical: 22 }}>
					<Text
						style={{
							fontSize: 22,
							fontWeight: "bold",
							marginVertical: 12,
							color: COLORS.black,
						}}>
						Hi Welcome Back ! 👋
					</Text>

					<Text
						style={{
							fontSize: 16,
							color: COLORS.black,
						}}>
						Hello again you have been missed!
					</Text>
				</View>

				<View style={{ marginBottom: 12 }}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: 400,
							marginVertical: 8,
						}}>
						Email address
					</Text>

					<View
						style={{
							width: "100%",
							height: 48,
							borderColor: COLORS.black,
							borderWidth: 1,
							borderRadius: 8,
							alignItems: "center",
							justifyContent: "center",
							paddingLeft: 22,
						}}>
						<TextInput
							onChangeText={(event) =>
								setLoginPayload((prev) => ({
									...prev,
									email: event,
								}))
							}
							placeholder="Enter your email address"
							placeholderTextColor={COLORS.black}
							keyboardType="email-address"
							style={{
								width: "100%",
							}}
						/>
					</View>
				</View>

				<View style={{ marginBottom: 12 }}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: 400,
							marginVertical: 8,
						}}>
						Password
					</Text>

					<View
						style={{
							width: "100%",
							height: 48,
							borderColor: COLORS.black,
							borderWidth: 1,
							borderRadius: 8,
							alignItems: "center",
							justifyContent: "center",
							paddingLeft: 22,
						}}>
						<TextInput
							onChangeText={(event) =>
								setLoginPayload((prev) => ({
									...prev,
									password: event,
								}))
							}
							placeholder="Enter your password"
							placeholderTextColor={COLORS.black}
							secureTextEntry={isPasswordShown}
							style={{
								width: "100%",
							}}
						/>

						<TouchableOpacity
							onPress={() => setIsPasswordShown(!isPasswordShown)}
							style={{
								position: "absolute",
								right: 12,
							}}>
							{isPasswordShown == true ? (
								<Ionicons name="eye-off" size={24} color={COLORS.black} />
							) : (
								<Ionicons name="eye" size={24} color={COLORS.black} />
							)}
						</TouchableOpacity>
					</View>
				</View>

				<View
					style={{
						flexDirection: "row",
						marginVertical: 6,
					}}>
					<Checkbox
						style={{ marginRight: 8 }}
						value={isChecked}
						onValueChange={setIsChecked}
						color={isChecked ? COLORS.primary : undefined}
					/>

					<Text>Remember Me</Text>
				</View>

				<Button
					title={isLoading ? "Loading.." : "Login"}
					filled
					style={{
						marginTop: 18,
						marginBottom: 4,
					}}
					onPress={handleLogin}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Login;
