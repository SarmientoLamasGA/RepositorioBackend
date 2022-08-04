const axios = require("axios");

const getAll = () => {
  const data = axios.get("http://localgost:8080/api/productos");
  return data;
};
const getById = () => {
  const data = axios.get("http://localgost:8080/api/productos/2");
  return data;
};

console.log(getAll());
console.log(getById());
