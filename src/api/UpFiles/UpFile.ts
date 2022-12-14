import { message } from "antd";
import ms_signature from "../ms-signature";

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
