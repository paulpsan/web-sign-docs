import React from 'react'
import "./RestrictedAccess.scss"
import { Button, Result } from 'antd'
import UserService from '../../../services/UserService';

export const RestrictedAccess = () => {
    
    return (
        <Result
            title="!Acceso Restringido por favor consulte con el administrador del sistema!"
            extra={
                <Button type="primary" key="console" size='large' onClick={ () => UserService.doLogout() }>
                    !Volver Atras!
                </Button>
            }
        />
    )
}
