import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "http://backend-alb-1137458343.us-east-1.elb.amazonaws.com/api",
});

API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }

    return req;
});

export default API;