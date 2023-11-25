import AsyncStorage from "@react-native-async-storage/async-storage";

export const createToken = () => {
	const tokenLength = 16;
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let token = "";

	for (let i = 0; i < tokenLength; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		token += characters.charAt(randomIndex);
	}

	return token;
};

export const calculateDaysBetweenDates = (checkin, checkout) => {
	console.log(checkin);
	const checkinDate = checkin;
	const checkoutDate = checkout;

	const timeDifference = checkoutDate - checkinDate;

	const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

	return daysDifference;
};

export const idrFormat = (num) =>
	num.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

const BOOKING_STORAGE_KEY = "booking";

export const loadBooking = async () => {
	try {
		const storedWishlist = await AsyncStorage.getItem(BOOKING_STORAGE_KEY);
		return storedWishlist != null ? JSON.parse(storedWishlist) : [];
	} catch (error) {
		console.error("Error loading wishlist from AsyncStorage:", error);
		return [];
	}
};

export const saveBooking = async (wishlist) => {
	try {
		const previousWishlist = await loadBooking();
		const updatedWishlist = [...previousWishlist, wishlist];

		await AsyncStorage.setItem(
			BOOKING_STORAGE_KEY,
			JSON.stringify(updatedWishlist)
		);
	} catch (error) {
		console.error("Error saving wishlist to AsyncStorage:", error);
	}
};

const removeFromLocalStorage = async (wishlist) => {
	try {
		const previousWishlist = await loadWishlistFromStorage();
		const updateWishlist = previousWishlist.filter(
			(item) => item.summary.id !== wishlist.summary.id
		);

		if (previousWishlist.length !== 0) {
			await AsyncStorage.setItem(
				BOOKING_STORAGE_KEY,
				JSON.stringify(updateWishlist)
			);
		}
	} catch (error) {
		console.error("Error saving wishlist to AsyncStorage:", error);
	}
};
