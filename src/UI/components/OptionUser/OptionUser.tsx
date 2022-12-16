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
/* A function that returns a menu with the options of the user. */
export const OptionUser = () => {
    const { nav }: any = useContext(NavContext);
    /* Create an array of objects referencing the menu component as a child. */
    const items: MenuItem[] = [
        getItem( UserService.getUsername(), 'sub1', nav ? <UserOutlined /> : null, [
            getItem((<Link className='text_link' to={"/firma-page/guia-user"}> Guia de Usuario </Link> ), '3', <QuestionOutlined />),
            getItem('Cerrar Sesión', '4', <LogoutOutlined />),
        ]),
    ];
    /**
     * If the index is 4, then logout the user and clear the local storage.
     * @param {any} index - the index of the selected item in the dropdown
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
