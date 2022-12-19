import { useEffect, useState } from 'react'
import ms_signature from '../../ms-signature';

export const ListPDFSignature = ({ firma }: any) => {
    const [isLoadingSigature, setisLoadingSigature] = useState(true);
    const [list_files, setlist_files] = useState([])    
    /**
     * I'm sending a formData object to the server, and then I'm getting a response from the server,
     * and then I'm setting the state of the component with the response.
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
    /* It's a hook that runs when the component is mounted. */
    useEffect(() => {
        getFiles()
    }, []);
    return {
        isLoadingSigature,
        list_files
    }
}
