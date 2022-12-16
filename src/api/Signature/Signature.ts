import { message } from "antd";
import ms_signature from "../ms-signature";

/**
 * It takes a number, makes a post request to a microservice, and returns the id of the post request.
 * @param {any} nro_firmas - number of signatures
 * @returns The id of the signature process.
 */
export async function addSignature(nro_firmas: any) {
    const date = new Date()
    let id_signature = "";
    var data = JSON.stringify({
        "state_signature_process": true,
        "date_start_signature_process": date,
        "nro_signature": nro_firmas
    });

    await ms_signature({
        method: 'post',
        url: '/signature',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
        .then(function (response) {
            id_signature = response.data
            message.success("Proceso de Firma Registrado");
        })
        .catch(function () {
            message.error("Error al registrar")
        });
    return id_signature
} 