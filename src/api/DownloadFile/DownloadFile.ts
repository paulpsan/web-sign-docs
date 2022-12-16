import { message } from "antd";
import fileDownload from "js-file-download";
import ms_signature from "../ms-signature";

/**
 * It takes a string as an argument, and then it sends a POST request to the server with the string as
 * a parameter.
 * @param {any} nameZip - any =&gt; name of the file to download
 */
export default function downloadZIP( nameZip: any ){
    var formdata = new FormData();
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    const nameZipData = nameZip;
    const myArray = preferred_username.split('@');

    formdata.append("nameFile", nameZipData);
    formdata.append("nameFolder", myArray[0]);
    ms_signature.post('/dowload_file', formdata, { responseType: "blob" })
        .then( ({ data }) => {
            fileDownload(data, nameZipData)
            message.success("Archivo descargado.")
        })
        .catch(() => {
            message.error("Error al descargar copia de archivos!")
        });
}
