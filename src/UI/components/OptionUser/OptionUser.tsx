import { FileUnknownOutlined, LogoutOutlined, QuestionOutlined, SettingOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {useContext} from 'react'
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
export const OptionUser = () => {
    const { nav, setNav }: any = useContext(NavContext);
    const items: MenuItem[] = [
        getItem( UserService.getUsername(), 'sub1', nav ? <UserOutlined /> : null, [
            getItem('Cambio Contraseña', '2', <SettingOutlined />),
            getItem('Ayuda', '3', <QuestionOutlined />),
            getItem('Cerrar Sesión', '4', <LogoutOutlined />),
        ]),
    ];
    const getOptions = (index: any) => {
        switch (index) {
            case "2":
                console.log("CAMBIO DE CONTRASEÑA");
                break;
            case "3":
                console.log("AYUDA");
                break;
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
