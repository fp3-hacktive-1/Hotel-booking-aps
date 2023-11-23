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
