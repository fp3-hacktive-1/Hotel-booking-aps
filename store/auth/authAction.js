import { createAsyncThunk } from "@reduxjs/toolkit";
import { createToken } from "../../utils";

const loginCredentials = [
	{
		id: "1",
		username: "Developer",
		email: "developer@gmail.com",
		password: "123456",
	},
	{
		id: "2",
		username: "User",
		email: "user@gmail.com",
		password: "123456",
	},
];

export const signIn = createAsyncThunk(
	"auth/login",
	async ({ email, password }) => {
		const user = loginCredentials.find((item) => item.email === email);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (user && user.password === password) {
					resolve({
						id: user.id,
						username: user.username,
						email: user.email,
						token: createToken(),
					});
				} else {
					reject("Invalid credentials");
				}
			}, 1000);
		});
	}
);
