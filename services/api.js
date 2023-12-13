import axios from "axios";

const apiInstance = axios.create({
	baseURL: "https://hotels-com-provider.p.rapidapi.com/v2",
	headers: {
		"X-RapidAPI-Key": "9fd416ba99msh5712735a4852688p153a36jsn4fe0842cfeeb",
		"X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
	},
});

export default apiInstance;
