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
    const response = await axios.post('http://localhost:8000/logout');

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
};

export const createCart = async (id) => {
  try {
    const response = await axios.post('http://localhost:8000/cart/', id)

    return response.data;

  } catch (err) {
    throw err.response.data
  }
};

export const getCartById = async (id) => {
  try {
    const response = await axios('http://localhost:8000/cart/', id)

    return response.data

  } catch (err) {
    throw err.response.data
  }
};

export const addToCart = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/cart/items', data)
    
    return response.data

  } catch (err) {
    throw err.response.data
  }
};