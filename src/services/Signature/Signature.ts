import { message } from "antd";
import ms_signature from "../../api/ms-signature";
/**
 * Toma un número, realiza una solicitud de publicación a un microservicio y devuelve la identificación de la solicitud de publicación.
 * @param {any} nro_firmas - número de firmas
 * @returns El id del proceso de firma.
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