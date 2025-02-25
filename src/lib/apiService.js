import axiosInstance from "@/lib/axiosInstance";

//Get Request
export const fetchData = async (endPoint, params = {}) => {
    try {
        return await axiosInstance.get(endPoint, { params });
    } catch (error) {
        console.error("Fetch Error:", error.message);
        throw error;
    }
};

//Post Request
export const postData = async (endPoint, data) => {
    try {
        return await axiosInstance.post(endPoint, data);
    } catch (error) {
        console.error("Post Error:", error.message);
        throw error;
    }
};

// PUT request
export const updateData = async (endPoint, data) => {
    try {
        return await axiosInstance.put(endPoint, data);
    } catch (error) {
        console.error("Update Error", error.message);
    }
}

// Delete Request

export const deleteData = async (endPoint) => {
    try {
return await axiosInstance.delete(endPoint);
    } catch (error) {
        console.error("Delete Error", error.message);
    }
}