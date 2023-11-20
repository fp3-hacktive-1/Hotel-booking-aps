import axios from "axios";

const apiInstance = axios.create({
	baseURL: "https://hotels-com-provider.p.rapidapi.com/v2",
	headers: {
		"X-RapidAPI-Key": "9fc3bf38bfmsh151e40aac1ad69dp1b29a0jsn5353a46cc5d9",
		"X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
	},
});

export default apiInstance;
