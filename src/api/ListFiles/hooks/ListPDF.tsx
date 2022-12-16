import React, { useEffect, useState } from 'react'
import ms_signature from '../../ms-signature';

export const ListPDF = () => {
    const [isLoadingA, setisLoadingA] = useState(true);
    const [list_files, setlist_files] = useState([])
    /**
     * I'm going to call the getFiles function, and when it's done, I'm going to set the list_files
     * state to the data that I got back from the API call, and I'm going to set the isLoadingA state
     * to false.
     */
    const getFiles = async () => {
        const { data }: any = await ms_signature.get('/get_files_pdf')
        setlist_files(data);
        setisLoadingA(false);
    }
    /* It's calling the getFiles function when the component is mounted. */
    useEffect(() => {
        getFiles()
    }, [])
    return {
        isLoadingA,
        list_files
    }
}
