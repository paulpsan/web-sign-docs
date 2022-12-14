import { message } from "antd";
import fileDownload from "js-file-download";
import moment from "moment";
import ms_signature from "../ms-signature";

export default function compressSignaturePDF(firma: any) {
    var formdata = new FormData();
    const date = new Date()
    const carpetaFinal = firma - 1;
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    const fecha_compress = moment(date).format("DD_mm_YYYY_HH_MM_SS");
    const name_zip = preferred_username + "_" + fecha_compress;
    formdata.append("name_zip", name_zip);
    formdata.append("name_folder_user", preferred_username);
    formdata.append("folder_final", carpetaFinal.toString());
    ms_signature.post("/compress_file", formdata, { responseType: "blob" })
        .then(({ data }) => {
            fileDownload(data, name_zip + ".zip");
        })
        .catch((error) => {
            message.error("Error al comprimir archivos!")
        });
}