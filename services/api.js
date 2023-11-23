import axios from "axios";

const apiInstance = axios.create({
	baseURL: "https://hotels-com-provider.p.rapidapi.com/v2",
	headers: {
		"X-RapidAPI-Key": "db8143bbb3mshaa260f248dd94dcp12dd05jsn6c67f5fbd529",
		"X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
	},
});

export default apiInstance;
