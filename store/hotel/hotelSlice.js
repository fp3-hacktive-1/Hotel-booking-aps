import { createSlice } from "@reduxjs/toolkit";
import { fetchHotels, fetchDetailHotel } from "./hotelAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
	isLoading: false,
	error: null,
	data: [],
	bookingData: [],
};

const hotelSlice = createSlice({
	name: "hotel",
	initialState,
	reducers: {
		booking: async (state, { payload }) => {
			console.log(state);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchHotels.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchHotels.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(fetchHotels.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.data = payload;
		});
		builder.addCase(fetchDetailHotel.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchDetailHotel.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(fetchDetailHotel.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
		});
	},
});

export const { booking } = hotelSlice.actions;
export default hotelSlice.reducer;
