import React, { useEffect, useState } from 'react'
import ms_signature from '../../ms-signature';

export const ListPDF = () => {
    const [isLoadingA, setisLoadingA] = useState(true);
    const [list_files, setlist_files] = useState([])
    const getFiles = async () => {
        const { data }: any = await ms_signature.get('/get_files_word')
        setlist_files(data);
        setisLoadingA(false);
    }
    useEffect(() => {
        getFiles()
    }, [])
    return {
        isLoadingA,
        list_files
    }
}
