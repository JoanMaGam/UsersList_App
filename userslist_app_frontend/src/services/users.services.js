import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getAllUsers = async () => {

    try {
        const response = await axios.post(`${apiUrl}/sync`);
        return response.data.users;
    } catch (error) {
        return error.message;
    };
};


const createUser = async (values) => {

    try {
        const response = await axios.put(`${apiUrl}/users`, values);
        return response.data;
    } catch (error) {
        return error.message;
    };
};

export { getAllUsers, createUser }