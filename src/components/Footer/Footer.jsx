import './Footer.css';
import { SiWhatsapp } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import img1 from "../../assets/BrandName2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section logo-section d-flex align-items-center gap-2">
            <img src={img1} alt="Logo" className="brand-logo" />
            <div className="brand-text">
              <span>Jonathan</span><br />
              <span>Cosentino</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Collegamenti Rapidi</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/gallery">Panoramica</a></li>
              <li><a href="/contactme">Contatti</a></li>
            </ul>
          </div>

          <div className="footer-section contact-links">
            <h4>Connessioni</h4>
            <div className="social-links">
              <a href="https://wa.me/+393491576105" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"><SiWhatsapp /></i>
              </a>
              <a href="https://www.facebook.com/jonathan.cosentino.9" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"><FaFacebookF /></i>
              </a>
              <a href="https://www.instagram.com/joncos90/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"><FaInstagram /></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Jonathan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
