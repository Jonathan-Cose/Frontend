import { useAuthContext } from '../../context/authContext';
import { useState } from 'react';
import './NavBarAdmin.css';
import img1 from '../../assets/BrandName2.png';

const NavBarAdmin = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="admin-bg fixed-top w-100 px-4">
      <div className="adminNav container-fluid">
        <a className="admin-brand d-flex align-items-center gap-2" href="/admin">
          <img src={img1} alt="Logo" className="brand-logo" />
          <div className="brand-text">
            <span>Jonathan</span><br />
            <span>Cosentino</span>
          </div>
        </a>

        <div className="admin-links">
          <button className="btn btn-danger logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarAdmin;
