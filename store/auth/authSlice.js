import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./authAction";

const initialState = {
	isLoading: false,
	error: null,
	isAuthenticated: false,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signOut: (state) => {
			state.isLoading = false;
			state.isAuthenticated = false;
			state.user = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signIn.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(signIn.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(signIn.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isAuthenticated = true;
			console.log("payload", payload);
			state.user = payload;
		});
	},
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
