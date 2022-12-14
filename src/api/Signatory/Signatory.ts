import { message } from "antd";
import ms_signature from "../ms-signature";

export async function addSignatory(nro_firmas: any, id_signature: any) {
    const date = new Date()
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    var data = JSON.stringify({
        "username": preferred_username,
        "state_signatory": true,
        "date_signatory": date,
        "nro_signatory": nro_firmas,
        "process_signatory": id_signature
    });

    ms_signature({
        method: 'post',
        url: '/signatory',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
        .then(function () {
            message.success("Proceso Registrado!")
        })
        .catch(function () {
            message.error("Error al registrar!")
        });
}