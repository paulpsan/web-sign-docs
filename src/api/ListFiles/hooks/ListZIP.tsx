import { useEffect, useState } from 'react'
import UserService from '../../../services/UserService';
import ms_signature from '../../ms-signature';

export const ListZIP = () => {
    const [isLoadingZIP, setisLoadingZIP] = useState(true);
    const [list_files, setlist_files] = useState([])
    const { tokenParsed: { preferred_username } } = JSON.parse(localStorage.getItem('keycloak')!);
    const getFiles = async () => {
        const myArray = preferred_username.split('@');
        var formData = new FormData();
        formData.append("nameFolder", myArray[0]);
        const { data }: any = await ms_signature.post('/zip_signature', formData)
        setlist_files(data);
        setisLoadingZIP(false);
    }
    useEffect(() => {
        getFiles()
    }, [])
    return {
        isLoadingZIP,
        list_files
    }
}
