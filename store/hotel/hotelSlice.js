import { createSlice } from "@reduxjs/toolkit";
import { fetchHotels, fetchDetailHotel } from "./hotelAction";

const initialState = {
	isLoading: false,
	error: null,
	bookingData: [],
};

const hotelSlice = createSlice({
	name: "hotel",
	initialState,
	reducers: {
		booking: (state, { payload }) => {
			const { hotel } = payload;
			console.log(state.bookingData);
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
