import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/api";

export const fetchHotels = createAsyncThunk(
	"hotel/fetchAll",
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiInstance.get("/hotels/search", {
				params: {
					region_id: "159522",
					locale: "en_GB",
					checkin_date: "2023-11-18",
					sort_order: "REVIEW",
					adults_number: "1",
					domain: "ID",
					checkout_date: "2023-11-24",
					children_ages: "4,0,15",
					lodging_type: "HOTEL,HOSTEL,APART_HOTEL",
					price_min: "10",
					star_rating_ids: "3,4,5",
					meal_plan: "FREE_BREAKFAST",
					page_number: "1",
					price_max: "500",
					amenities: "WIFI,PARKING",
					payment_type: "PAY_LATER,FREE_CANCELLATION",
					guest_rating_min: "8",
					available_filter: "SHOW_AVAILABLE_ONLY",
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchDetailHotel = createAsyncThunk(
	"hotel/fetchDetail",
	async (hotelId, { rejectWithValue }) => {
		try {
			const response = await apiInstance.get("/hotels/details", {
				params: {
					domain: "ID",
					hotel_id: hotelId,
					locale: "en_GB",
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
