import axios from "axios"

export const login = async (data) => {
  await axios.post('http://localhost:8000/auth/login', data);
};

export const getProducts = async () => {
  const res = await fetch('http://localhost:8000/products/', {
    method: 'GET'
  })
  return res;
};
