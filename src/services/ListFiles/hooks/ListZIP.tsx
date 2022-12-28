import { useEffect, useState } from 'react'
import ms_signature from '../../../api/ms-signature';
export const ListZIP = () => {
    const [isLoadingZIP, setisLoadingZIP] = useState(true);
    const [list_files, setlist_files] = useState([])
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    /**
     * Toma la dirección de correo electrónico del usuario, la divide en una matriz y luego usa el primer elemento de
     * la matriz como el nombre de una carpeta.
     * 
     * Luego usa ese nombre de carpeta para realizar una solicitud al servidor, que devuelve una lista de archivos. 
     * 
     * A continuación, la lista de archivos se almacena en una variable de estado.
     */
    const getFilesZip = async () => {
        const myArray = preferred_username.split('@');
        await ms_signature.get(`/get_zip_signature?nameFolder=${myArray[0]}`, { headers:{ 'Content-Type': 'application/json' } })
        .then( (resp) => {    
                setlist_files(resp.data);
                setisLoadingZIP(false);
            })
            .catch( () => {
                setlist_files([]);
                setisLoadingZIP(false);
            });
    }
    /* Es un hook que se llama cuando se monta el componente. */
    useEffect(() => {
        getFilesZip()
    }, [])
    return {
        isLoadingZIP,
        list_files
    }
}
