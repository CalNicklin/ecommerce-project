import axios from "axios"

export const register = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/register', data);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/login', data);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('http://localhost:8000/auth/logout');

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios('http://localhost:8000/products');

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
};

export const getProductsBySku = async (url) => {
  try {
    const response = await axios(url);

    return response.data
    
  } catch (err) {
    throw err.response.data;
  }
}