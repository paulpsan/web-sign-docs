import { useEffect, useState } from 'react'
import UserService from '../../../services/UserService';
import ms_signature from '../../ms-signature';

export const ListZIP = () => {
    const [isLoadingZIP, setisLoadingZIP] = useState(true);
    const [list_files, setlist_files] = useState([])
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    /**
     * It takes the user's email address, splits it into an array, and then uses the first element of
     * the array as the name of a folder. 
     * 
     * It then uses that folder name to make a request to the server, which returns a list of files. 
     * 
     * The list of files is then stored in a state variable.
     */
    const getFiles = async () => {
        const myArray = preferred_username.split('@');
        var formData = new FormData();
        formData.append("nameFolder", myArray[0]);
        await ms_signature.post('/zip_signature', formData)
            .then( (res) => {
                setlist_files(res.data);
                setisLoadingZIP(false);
            })
            .catch( () => {
                setlist_files([]);
                setisLoadingZIP(false);
            });
    }
    /* A hook that is called when the component is mounted. */
    useEffect(() => {
        getFiles()
    }, [])
    return {
        isLoadingZIP,
        list_files
    }
}
