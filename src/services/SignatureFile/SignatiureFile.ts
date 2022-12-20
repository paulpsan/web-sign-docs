import { message } from "antd";
import ms_signature from "../../api/ms-signature";
/**
 * Toma una matriz de objetos, cada objeto tiene un archivo y una contraseña, la función envía el archivo y
 * contraseña al servidor, el servidor devuelve un mensaje, la función devuelve una matriz de mensajes.
 * </code>
 * @param {any} values - any = {
 * @returns Una serie de mensajes.
 */
export async function verifSignature(values: any) {
    const messageState: any = [];
    for (let index = 0; index < values.users.length; index++) {
        var formData = new FormData();
        const element = values.users[index];
        const encryp = btoa(element.password);
        formData.append("files", element.file[0].originFileObj);
        formData.append("password", encryp);
        await ms_signature
            .post("/certificate_verification", formData)
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
/**
 * Devuelve verdadero si todos los elementos del array son iguales a "Contraseña Verificada", en caso contrario
 * retorna false.
 * @param {string[]} array_state -es una matriz de cadenas que contiene el estado de la contraseña.
 * @returns Una función que toma una matriz de cadenas como argumento y devuelve un valor booleano.
 */
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
/**
 * Toma una matriz de objetos y, para cada objeto de la matriz, realiza una solicitud POST a un servidor.
 * @param {any} dataInfo - es una matriz de objetos que contiene las siguientes propiedades:
 */
export async function signaturePDF(dataInfo: any) {
    for (let index = 0; index < dataInfo.length; index++) {
        var formDataF = new FormData();
        const { password, file, firmante }: any = dataInfo[index];
        const encryp = btoa(password);
        formDataF.append("contraseña", encryp);
        formDataF.append("firmante", firmante);
        formDataF.append("certificado", file[0].originFileObj);
        formDataF.append("firma", index.toString());
        formDataF.append("x", index == 0 ? "50" : "350");
        formDataF.append("y", "50");
        await ms_signature
            .post("/signed_files_pdf", formDataF)
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