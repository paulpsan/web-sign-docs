import { message } from "antd";
import ms_signature from "../ms-signature";

export async function verifSignature(values: any) {
    const messageState: any = [];
    for (let index = 0; index < values.users.length; index++) {
        var formData = new FormData();
        const element = values.users[index];
        formData.append("files", element.file[0].originFileObj);
        formData.append("password", element.password);
        await ms_signature
            .post("/verif_firma", formData)
            .then((resp) => {
                message.info(resp.data);
                messageState.push(resp.data);
            })
            .catch((error) => {
                message.error("error");
            });
    }
    return messageState
}
export function StateVerific(array_state:string[]) {
    let verfi = 0;
    for (let index = 0; index < array_state.length; index++) {
        if(array_state[index] == "Contraseña Verificada"){
            verfi = verfi + 1;
        }
    }
    if( verfi == array_state.length ){
        return true
    }
    else{
        return false 
    }
}
export async function signaturePDF(dataInfo: any) {
    for (let index = 0; index < dataInfo.length; index++) {
        var formDataF = new FormData();
        const { password, file, firmante }: any = dataInfo[index];
        formDataF.append("contraseña", password);
        formDataF.append("firmante", firmante);
        formDataF.append("certificado", file[0].originFileObj);
        formDataF.append("firma", index.toString());
        formDataF.append("x", index == 0 ? "50" : "350");
        formDataF.append("y", "50");
        await ms_signature
            .post("/firma_files_pdf", formDataF)
            .then((resp) => {
                resp.data.message == "ok"
                    ? message.success("Archivo firmados Correctamente")
                    : message.error("Error al firmar archivos");
            })
            .catch((error) => {
                message.error("Error al firmar archivos")
            });
    }
}

