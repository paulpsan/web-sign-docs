import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";
const { VITE_SVC_SIGNATURE_API } = getEnvVariables();
const ms_signature = axios.create({
    baseURL: `${ VITE_SVC_SIGNATURE_API }/v1/ms-firmas`
});

export default ms_signature;