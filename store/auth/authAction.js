import { createAsyncThunk } from "@reduxjs/toolkit";
import { createToken } from "../../utils";

const loginCredentials = [
	{
		id: "1",
		username: "Developer",
		email: "developer@gmail.com",
		password: 123456,
	},
	{
		id: "2",
		username: "User",
		email: "user@gmail.com",
		password: 123456,
	},
];

const fakeLogin = async (email, password) =>
	new Promise((resolve, reject) => {
		const user = loginCredentials.find((item) => item.email === email);
		setTimeout(() => {
			if (user && user.password === password) {
				resolve({
					id: user.id,
					username: user.username,
					email: user.email,
					token: createToken(),
				});
			} else {
				reject("Credential not found");
			}
		}, 1000);
	});

export const signIn = createAsyncThunk(
	"auth/signin",
	async (user, { rejectWithValue }) => {
		const { email, password } = user;
		try {
			const response = await fakeLogin(email, password);
			return response;
		} catch (error) {
			rejectWithValue(error);
		}
	}
);
