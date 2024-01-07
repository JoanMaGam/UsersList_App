import axios from "axios";

const baseUrl = 'http://localhost:3000/api/users';

const getAllUsers = async () => {

    try {
        const response = await axios.post(`${baseUrl}/sync`);
        return response.data.users;
    } catch (error) {
        return error.message;
    };
};


const createUser = async (values) => {

    try {
        const response = await axios.put(`${baseUrl}/users`, values);
        return response.data;
    } catch (error) {
        return error.message;
    };
};

export { getAllUsers, createUser }