import axios from "axios"

export const login = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/login', data);

    console.log(response.data);
    return response.data;

  } catch (err) {
    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('http://localhost:8000/auth/logout');

    console.log(response.data);
    return response.data;

  } catch (err) {
    throw err.response.data;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios('http://localhost:8000/products');

    console.log(response.data);
    return response.data;

  } catch (err) {
    throw err.response.data;
  }
};
