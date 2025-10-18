import { useState } from 'react';
import './Navbar.css';
import img1 from "../../assets/BrandName2.png";

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Mi Presento', href: '/aboutme' },
  { label: 'Panoramica', href: '/gallery' },
  { label: 'Contatti', href: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="navbar fancy-navbar fixed-top w-100 px-4 py-3">
      <div className="container-fluid d-flex justify-between align-items-center">
        <a className="fancy-brand d-flex align-items-center gap-2" href="/">
          <img src={img1} alt="Logo" className="brand-logo" />
          <div className="brand-text">
            <span>Jonathan</span><br />
            <span>Cosentino</span>
          </div>
        </a>

        <div className='d-flex justify-content-center align-items-center'>
          <ul className="navbar-links-inline">
            {navLinks.map(link => (
              <li className="nav-item" key={link.href}>
                <a className="nav-link fancy-link" href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <button className="navbar-hamburger" onClick={handleToggle} aria-label="Toggle navigation">
            <span className="navbar-hamburger-icon">&#9776;</span>
          </button>

          <ul className={`navbar-links-dropdown ${menuOpen ? 'open' : ''}`}>
            <li className="nav-item nav-login">
              <a className="nav-link fancy-link" href="/login" onClick={handleClose}>Login</a>
            </li>
            {navLinks.map(link => (
              <li className="nav-item nav-mobile-only" key={link.href}>
                <a className="nav-link fancy-link" href={link.href} onClick={handleClose}>{link.label}</a>
              </li>
            ))}
          </ul>

          {menuOpen && <div className="navbar-backdrop" onClick={handleClose}></div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
