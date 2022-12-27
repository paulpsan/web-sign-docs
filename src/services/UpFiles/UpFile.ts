import { message } from "antd";
import ms_signature from "../../api/ms-signature";

/**
 * Toma un archivo, lo sube al servidor y luego el servidor descomprime el archivo y devuelve un
 * mensaje.
 * </code>
 * @param {any} values - {
 */
export async function unZipFiles(values:any) {
  var formdata = new FormData();
  const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
  formdata.append("files", values.file[0].originFileObj);
  formdata.append("name_user", preferred_username);
  await ms_signature
    .post("/extract_files", formdata)
    .then((resp) => {
      message.success(resp.data.message)
    })
    .catch(() => {
      message.error("Error al procesar archivos!")
    });
}
