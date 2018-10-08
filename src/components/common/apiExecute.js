import axios from "axios";

export const ApiExecute = (url, httpAction, data = null) => {
	switch (httpAction) {
		case "GET":
			return axios
				.get(url, { withCredentials: false })
				.then(response => response.data)
				.catch(err => err);

		case "POST":
			return axios
				.post(url, data, { withCredentials: false })
				.then(response => response.data)
				.catch(err => err);

		case "PUT":
			return axios
				.put(url, data, { withCredentials: false })
				.then(response => response.data)
				.catch(err => err);

		case "DELETE":
			return axios
				.delete(url, { withCredentials: false })
				.then(response => response.data)
				.catch(err => err);
		default:
			break;
	}
};
