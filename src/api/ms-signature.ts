import axios from "axios";

const environmentProd = "http://10.17.14.42:8081";
const environmentTest = "http://10.17.8.80:8080/backend";
/* Crear una nueva instancia de axios con una baseURL. */
const ms_signature = axios.create({
    baseURL: `${environmentTest}/v1/ms-firmas`
});

export default ms_signature;