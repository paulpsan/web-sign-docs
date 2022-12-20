import { message } from "antd";
import ms_signature from "../../api/ms-signature";
/**
 * Envía una solicitud al servidor para limpiar una carpeta en el servidor.
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