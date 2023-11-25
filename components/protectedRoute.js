import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const navigation = useNavigation();

	useEffect(() => {
		if (!isAuthenticated && !user) {
			navigation.navigate("Login");
		}
	}, [isAuthenticated, navigation]);

	return <>{children}</>;
};

export default ProtectedRoute;
