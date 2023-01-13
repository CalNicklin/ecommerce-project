import axios from "axios"

export const login = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/login', data);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
};

export const getProducts = async () => {
  const res = await fetch('http://localhost:8000/products/', {
    method: 'GET'
  })
  return res;
};
