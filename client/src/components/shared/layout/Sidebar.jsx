import React from 'react';
import { userMenu } from '../Menus/userMenus';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {userMenu.map((menu, i) => {
            const isActive = location.pathname === menu.path;
            return (
              <div key={i} className={`menu-item ${isActive && 'active'}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
