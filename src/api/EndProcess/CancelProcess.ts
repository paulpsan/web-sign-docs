import { message } from "antd";
import ms_signature from "../ms-signature";

/**
 * It sends a request to the server to delete a folder in the server.
 */
export default function cancelProcessSignature() {
    ms_signature.post('/cancel_process_signature')
        .then((resp) => {
            message.success(resp.data.message);
            localStorage.removeItem('folder_firma');
        })
        .catch(() => {
            message.error("Ocurrio un erro al terminar el proceso!");
        })
}