import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/api";

const currentDate = new Date();
const nextMonthDate = new Date(
	currentDate.setMonth(currentDate.getMonth() + 1)
);

const nextMonth = nextMonthDate.toISOString().split("T")[0];

export const fetchHotels = createAsyncThunk(
	"hotel/fetchAll",
	async ({ regionId }, { rejectWithValue }) => {
		try {
			const response = await apiInstance.get("/hotels/search", {
				params: {
					region_id: regionId,
					locale: "en_GB",
					checkin_date: new Date().toISOString().split("T")[0],
					sort_order: "REVIEW",
					adults_number: "1",
					domain: "ID",
					checkout_date: nextMonth,
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
