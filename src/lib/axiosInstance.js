import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "https://breezend-backend-2.onrender.com/api",
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        if(typeof window !== "undefined"){
            const token = localStorage.getItem("token");
            if (token){
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
          const { status } = error.response;
    
          if (status === 401) {
            console.error("Unauthorized! Redirecting...");
            if (typeof window !== "undefined") {
              localStorage.removeItem("token"); // Token hata do
              window.location.href = "/login"; // User ko login page pe bhej do
            }
          } else if (status === 403) {
            console.error("Forbidden! Access denied.");
          } else if (status === 500) {
            console.error("Server error! Try again later.");
          }
        } else {
          console.error("Network error or request was blocked.");
        }
    
        return Promise.reject(error);
      }
)

export default axiosInstance;