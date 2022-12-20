import React, { useEffect, useState } from 'react'
import ms_signature from '../../../api/ms-signature';

export const ListPDF = () => {
    const [isLoadingA, setisLoadingA] = useState(true);
    const [list_files, setlist_files] = useState([])
    /**
     * Voy a llamar a la función getFiles, y cuando termine, voy a configurar list_files
     * estado a los datos que obtuve de la llamada API, y voy a configurar el estado isLoadingA
     * a falso
     */
    const getFiles = async () => {
        const { data }: any = await ms_signature.get('/get_files_pdf')
        setlist_files(data);
        setisLoadingA(false);
    }
    /* Está llamando a la función getFiles cuando se monta el componente. */
    useEffect(() => {
        getFiles()
    }, [])
    return {
        isLoadingA,
        list_files
    }
}