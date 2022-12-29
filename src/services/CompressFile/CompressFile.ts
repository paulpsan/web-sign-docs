import { message } from "antd";
import fileDownload from "js-file-download";
import moment from "moment";
import ms_signature from "../../api/ms-signature";
/**
 * Toma un número, lo convierte en una cadena y lo envía al servidor.
 * @param {any} firma - number
 */
export default function compressSignaturePDF(firma: any) {
    const date = new Date()
    const carpetaFinal = firma - 1;
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    const fecha_compress = moment(date).format("DD_MM_YYYY_HH_mm_ss");
    const name_zip = preferred_username + "_" + fecha_compress;
    const data = JSON.stringify({
        "name_zip": name_zip,
        "folder_final": carpetaFinal.toString(),
        "name_user": preferred_username
    })
    ms_signature.post("/compress_files_pdf", data, { responseType: "blob", headers: { 'Content-Type': 'application/json' } })
        .then(({ data }) => {
            fileDownload(data, name_zip + ".zip");
        })
        .catch((error) => {
            console.log(error);
            message.error("Error al comprimir archivos!")
        });
}