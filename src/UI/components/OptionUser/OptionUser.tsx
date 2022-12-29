import { LogoutOutlined, QuestionOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {useContext} from 'react'
import { Link } from 'react-router-dom';
import NavContext from '../../../context/NavContext/NavContext';
import UserService from '../../../services/UserService';
import "./OptionUser.scss"
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
/* Una función que devuelve un menú con las opciones del usuario. */
export const OptionUser = () => {
    const { nav, setNav }: any = useContext(NavContext);
    /* Cree una matriz de objetos que hagan referencia al componente de menú como elemento secundario. */
    const items: MenuItem[] = [
        getItem( UserService.getUsername(), 'sub1', nav ? <UserOutlined /> : null, [
            getItem((<Link className='text_link' to={"/firma-page/guia-user"}> Guia de Usuario </Link> ), '3', <QuestionOutlined />),
            getItem('Cerrar Sesión', '4', <LogoutOutlined />),
        ]),
    ];
    /**
     * Si el índice es 4, cierre la sesión del usuario y borre el almacenamiento local.
     * @param {any} index - el índice del elemento seleccionado en el menú desplegable
     */
    const getOptions = (index: any) => {
        switch (index) {
            case "4":
                UserService.doLogout();
                localStorage.clear();
                break;
            default:
                break;
        }
    }
    return (
        <div className='menuItem_option_user'>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
                onClick={({ keyPath }) => { getOptions(keyPath[0])}}
            />
        </div>
    )
}
