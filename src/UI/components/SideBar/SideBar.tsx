import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdAllInbox, MdOutlineAccountBalance, MdOutlineLogout, MdSubdirectoryArrowRight } from "react-icons/md";
import { MenuItem } from "../MenuItem/MenuItem";
import { OptionUser } from "../OptionUser/OptionUser";
import logo_bfo from "./../../../assets/LOGO_FONDO_BLANCO_RGB-01-SF.png";
import logo_mini_bfo from "./../../../assets/mini_logo_bfo.png";
import NavContext from "../../../context/NavContext/NavContext";
import "./SideBar.scss";

export const SideBar = ({ children }: any) => {
/* Destructuring the nav and setNav from the NavContext. */
  const { nav, setNav }: any = useContext(NavContext);
  return (
    <>
      <div
        className={` sidebar_container ${nav ? "navbar_mobile_active" : undefined
          }`}
      >
        {/**TEST */}
        <div className="test">
          <MdSubdirectoryArrowRight
            onClick={() => {
              setNav(!nav);
            }}
          />
        </div>
        <nav className={nav ? undefined : "nav_small"}>
          {/** LOGO*/}
          <div className="logo">
            {nav ? <img src={logo_bfo} alt="bfo" /> : <img src={logo_mini_bfo} alt="bfo-mini" style={{ marginLeft: "-12px", height: "83px" }} />}
            <FaTimes
              className="mobile_cancel_icon"
              onClick={() => setNav(!nav)}
            />
          </div>
          <div>
            <OptionUser/>
          </div>
          {/**SUBMENU */}
          <ul className="menu_container">
            {/**FIRST CATEGORY */}
            <span className="categories">
              {nav ? "Grupo Fortaleza" : <BsThreeDots />}
            </span>
            {prim_cat.map((da, index) => (
              <MenuItem
                nav={nav}
                key={index}
                url={da.url}
                icon={da.icon}
                description={da.description}
              />
            ))}
          </ul>
          {/**Logout Button */}
          <div className="btn_logout">
            <MdOutlineLogout onClick={() => setNav(!nav)} />
          </div>
        </nav>
      </div>
      <main className="main_container">{children}</main>
    </>
  );
};

const prim_cat = [
  {
    url: "firma",
    icon: <MdAllInbox />,
    description: "Firma",
  },
  {
    url: "lista-firma",
    icon: <MdOutlineAccountBalance />,
    description: "Lista de Firmas",
  },
  // {
  //   url: "firmas-pendientes",
  //   icon: <MdRestore />,
  //   description: "Firmas Pendientes",
  // },
];
