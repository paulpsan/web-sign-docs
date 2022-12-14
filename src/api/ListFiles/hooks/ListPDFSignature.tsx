import React, { useEffect, useState } from 'react'
import ms_signature from '../../ms-signature';

export const ListPDFSignature = ({ firma }: any) => {
    const [isLoadingSigature, setisLoadingSigature] = useState(true);
    const [list_files, setlist_files] = useState([])
    const getFiles = async () => {
        const carpetaFinal = firma - 1;
        var formData = new FormData();
        formData.append("carpetaFinal", carpetaFinal.toString());
        const { data }: any = await ms_signature.post('/files_pdf_f', formData)
        setlist_files(data);
        setisLoadingSigature(false);
    }
    useEffect(() => {
        getFiles()
    }, [])
    return {
        isLoadingSigature,
        list_files
    }
}
