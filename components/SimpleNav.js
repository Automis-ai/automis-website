import Link from "next/link";
import { Fragment } from "react";

const SimpleNav = ({ menus, onePage }) => {
  return (
    <Fragment>
      <div className="hidden lg:flex desktop-menu">
        <div className="navbar-collapse clearfix">
          {onePage ? (
            <ul className="navigation onepage clearfix">
              {menus.map((menu) => (
                <li key={menu.id} className={menu.submenus ? "dropdown" : ""}>
                  <a href={`#${menu.href}`}>{menu.title}</a>
                  {menu.submenus && (
                    <ul>
                      {menu.submenus.map((submenu) => (
                        <li key={submenu.id}>
                          <a href={`#${submenu.href}`}>{submenu.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="navigation clearfix">
              {menus.map((menu) => (
                <li key={menu.id} className={menu.submenus ? "dropdown" : ""}>
                  <Link href={`/${menu.href === 'home' ? '' : menu.href}`}>
                    {menu.title}
                  </Link>
                  {menu.submenus && (
                    <>
                      <ul>
                        {menu.submenus.map((submenu) => (
                          <li key={submenu.id}>
                            <Link href={`/${submenu.href}`}>
                              {submenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="dropdown-btn">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.29289 7.29289C5.68342 7.68342 6.31658 7.68342 6.70711 7.29289L11.2929 2.70711C11.9229 1.97705 11.3767 0.75 10.3536 0.75H1.64645C0.623286 0.75 0.0771429 1.97705 0.707107 2.70711L5.29289 7.29289Z" />
                        </svg>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SimpleNav;