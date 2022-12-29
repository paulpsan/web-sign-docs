import { useEffect, useState } from 'react'
import ms_signature from '../../../api/ms-signature';

export const ListPDFSignature = ({ firma }: any) => {
    const [isLoadingSigature, setisLoadingSigature] = useState(true);
    const [list_files_signed, setlist_files_signed] = useState([])    
    /**
     * Estoy enviando un objeto formData al servidor y luego recibo una respuesta del servidor,
     * y luego estoy configurando el estado del componente con la respuesta.
     */
    const getFilesSigned = async () => {
        const carpetaFinal = firma - 1;
        const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
        await ms_signature.get(`/files_pdf_signed?carpetaFinal=${carpetaFinal}&name_user=${preferred_username}`, { headers: { 'Content-Type': 'application/json' } })
            .then( resp => {
                setlist_files_signed(resp.data);
                setisLoadingSigature(false);
            })
            .catch( () => {
                setlist_files_signed([]);
                setisLoadingSigature(false);
            });
        
    };
    /* Es un HOOK que se ejecuta cuando se monta el componente. */
    useEffect(() => {
        getFilesSigned()
    }, []);
    return {
        isLoadingSigature,
        list_files_signed
    }
}
