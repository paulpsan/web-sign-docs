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
        await ms_signature.get(`/get_files_pdf_signed?carpetaFinal=${carpetaFinal}`, { headers: { 'Content-Type': 'application/json' } })
            .then( resp => {
                setlist_files(resp.data);
                setisLoadingSigature(false);
            })
            .catch( () => {
                setlist_files([]);
                setisLoadingSigature(false);
            });
        
    };
    /* Es un HOOK que se ejecuta cuando se monta el componente. */
    useEffect(() => {
        getFiles()
    }, []);
    return {
        isLoadingSigature,
        list_files
    }
}
