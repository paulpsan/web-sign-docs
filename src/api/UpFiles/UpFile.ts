import { message } from "antd";
import ms_signature from "../ms-signature";

/**
 * It takes a file, uploads it to the server, and then the server unzips the file and returns a
 * message.
 * </code>
 * @param {any} values - {
 */
export async function unZipFiles(values:any) {
  var formdata = new FormData();
  formdata.append("files", values.file[0].originFileObj);
  await ms_signature
    .post("/extract_files", formdata)
    .then((resp) => {
      message.success(resp.data.message)
    })
    .catch(() => {
      message.error("Error al procesar archivos!")
    });
}
