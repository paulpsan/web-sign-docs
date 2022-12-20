import { useEffect, useState } from 'react'
import ms_signature from '../../../api/ms-signature';

export const ListPDFSignature = ({ firma }: any) => {
    const [isLoadingSigature, setisLoadingSigature] = useState(true);
    const [list_files, setlist_files] = useState([])    
    /**
     * Estoy enviando un objeto formData al servidor y luego recibo una respuesta del servidor,
     * y luego estoy configurando el estado del componente con la respuesta.
     */
    const getFiles = async () => {
        const carpetaFinal = firma - 1;
        const data = JSON.stringify({
            "carpetaFinal": carpetaFinal.toString()
        })
        await ms_signature.post('/files_pdf_signed', data, { headers: { 'Content-Type': 'application/json' } })
            .then( resp => {
                setlist_files(resp.data);
                setisLoadingSigature(false);
            })
            .catch( () => {
                setlist_files([]);
                setisLoadingSigature(false);
            });
        
    };
    /* Es un gancho que se ejecuta cuando se monta el componente. */
    useEffect(() => {
        getFiles()
    }, []);
    return {
        isLoadingSigature,
        list_files
    }
}
