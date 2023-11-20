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
			state.user = payload;
		});
	},
});

export default authSlice.reducer;
