import { message } from "antd";
import ms_signature from "../ms-signature";

export default function endProccessSignature() {
    ms_signature.get('/end_process')
        .then(resp => {
            message.success(resp.data.message)
        })
        .catch(() => {
            message.error("Ocurrio un erro al terminar el proceso!")
        })
}