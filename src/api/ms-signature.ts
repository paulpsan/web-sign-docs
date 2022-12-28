import axios from "axios";
import { environment } from "../environments/environment";

const ms_signature = axios.create({
    baseURL: `${ environment.URL}/v1/ms-firmas`
});

export default ms_signature;