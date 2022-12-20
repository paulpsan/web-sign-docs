import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import NavContext from '../../../context/NavContext/NavContext';
import "./MenuItem.scss"
/**
 *Un componente React MenuItem -> SideMenu.
 * @param {any} url - path 
 * @param {any} icon - component Icon
 * @param {any} description - option menu name
 * @param {any} nav - sidebar status
 */
export const MenuItem = ( {url, icon, description, nav }:any ) => {
    const { setNav }: any = useContext(NavContext);
    const checkWindowsSize = () => {
        if (window.innerWidth < 1024) setNav(!nav)
    }
    return (
        <li className={ `li_navlink ${ nav ? undefined : "li_navlink_active" }` }>
            <NavLink
                to={`${url}`}
                onClick={() => checkWindowsSize()}
                className={({ isActive }) => (isActive ? "active" : undefined)}
            >
                {icon}
                <span className="description">{description}</span>
            </NavLink>
        </li>
    )
}
