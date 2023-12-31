import React from 'react';
import { BiDonateBlood, BiUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    toast.success('logged out successfully!!');
    navigate('/login');
  };
  return (
    <div className="navbar">
      <div className="container-fluid">
        <div className="navbar-brand h1">
          <BiDonateBlood size={30} className="mx-2" color="red" /> Blood Bank
          App
        </div>
        <ul className="navbar-nav flex-row">
          <li className="nav-item mx-3 my-1">
            <p className="nav-link">
              <BiUserCircle size={30} className="mx-2" />
              Welcome{' '}
              {user?.name || user?.hospitalName || user?.orgnizationName} &nbsp;
              <span className="badge bg-secondary">{user?.role}</span>
            </p>
          </li>
          <li className="nav-item mx-3 my-1">
            <button
              type="button"
              className="btn btn-danger"
              onClick={logoutHandler}
            >
              logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
