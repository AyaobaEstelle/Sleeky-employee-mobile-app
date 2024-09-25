import axios from "axios";

const ApiManager = axios.create({   
baseURL: "https://employee-management-api-xj3a.onrender.com",
responseType: "json",
// withCredentials: true,
});

export default ApiManager;