import { message } from "antd";
import fileDownload from "js-file-download";
import ms_signature from "../../api/ms-signature";
/**
 * Toma una cadena como argumento y luego envía una solicitud POST al servidor con la cadena como
 * un parametro.
 * @param {any} nameZip - any =&gt; nombre del archivo a descargar
 */
export default function downloadZIP( nameZip: any ){
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    const nameZipData = nameZip;
    const myArray = preferred_username.split('@');
    const data = JSON.stringify({
        "nameFile":nameZipData,
        "nameFolder":myArray[0]
    });
    ms_signature.post('/download_zip_signature', data, { responseType: "blob", headers: { 'Content-Type': 'application/json' }})
        .then( ({ data }) => {
            fileDownload(data, nameZipData)
            message.success("Archivo descargado.")
        })
        .catch(() => {
            message.error("Error al descargar copia de archivos!")
        });
}
