import React, { useEffect, useState } from 'react'
import ms_signature from '../../ms-signature';

export const ListPDFSignature = ({ firma }: any) => {
    const [isLoadingSigature, setisLoadingSigature] = useState(true);
    const [list_files, setlist_files] = useState([])
    
    /**
     * I'm sending a formData object to the server, and then I'm getting a response from the server,
     * and then I'm setting the state of the component with the response.
     */
    const getFiles = async () => {
        const carpetaFinal = firma;
        console.log(carpetaFinal);
        var formData = new FormData();
        formData.append("carpetaFinal", carpetaFinal.toString());
        const { data }: any = await ms_signature.post('/files_pdf_signed', formData)
        setlist_files(data);
        setisLoadingSigature(false);
    }
    /* It's a hook that runs when the component is mounted. */
    useEffect(() => {
        getFiles()
    }, [])
    return {
        isLoadingSigature,
        list_files
    }
}
