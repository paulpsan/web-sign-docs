import { message } from "antd";
import moment from "moment";
import ms_signature from "../../api/ms-signature";
/**
 * Toma un objeto JSON, le agrega algunos datos y luego lo envía a un punto final de la API.
 */
export default function endProccessSignature() {
    const date = new Date()
    const carpetaFinal = JSON.parse(localStorage.getItem("folder_firma")!) - 1;
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    const fecha_compress = moment(date).format("DD_MM_YYYY_HH_mm_ss");
    const name_zip = preferred_username + "_" + fecha_compress;
    const data = JSON.stringify({
        "name_zip":name_zip,
        "name_folder_user":preferred_username,
        "folder_final":carpetaFinal.toString()
    });
    ms_signature.post('/end_process_signature', data, { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
            message.success("Proceso de Firma Digital Terminado.");
            localStorage.removeItem('folder_firma');
        })
        .catch(() => {
            message.error("Ocurrio un erro al terminar el proceso!");
        })
}

