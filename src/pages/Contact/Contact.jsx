import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import contactImg from '../../assets/contact1.jpg';
import './Contact.css';
import { FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp  } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-container">
        {/* Left Image Section */}
        <div className="contact-img-section">
          <img src={contactImg} alt="Contact" />
        </div>

        {/* Right Form Section */}
        <div className="contact-form-section">
          <h1 className="contact-title text-center">Contatti</h1>
          <p className="contact-subtitle">
            Dove si incontrano i riflessi<br/>

            Questo spazio, che ho curato con devozione, raccoglie immagini, parole, racconti e visioni.<br/>
            È un archivio di passi, di attese, di meditazione, di riflessi.<br/>
            Un luogo aperto, dove fotografia e scrittura si intrecciano per creare risonanze, non risposte.<br/>
            Un’unica via—comunque parziale e manchevole-d’espressione della realtà.<br/>

            Se qualcosa—anche solo per un istante—ti ha toccato, parlato, disturbato o commosso… scrivimi.<br/>

            Una frase, un pensiero, una domanda.<br/>
            Anche poche parole possono diventare un ponte.<br/>

            Ogni commento è un riflesso che torna indietro,<br/>
            un segno di presenza tra questi migliaia di significati.<br/>

            I riflessi di versi sono così: frammenti di vita che si sommano.<br/>
            Il tuo riflesso non oscura il mio — e viceversa.<br/>
            Insieme si completano, come facce dello stesso prisma.<br/>

            Le connessioni più vere, a volte, iniziano così:<br/>
            con un piccolo passo.<br/>
            Senza clamore, ma con verità.<br/>
            E un pizzico di coraggio.<br/>

            T’aspetto! Come il fiore che non sa se verrà l'ape.
          </p>

          {/* <form className="contact-form">
            <input
              type="email"
              placeholder="Your email address"
              className="contact-input"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="contact-input"
              required
            />
            <div className="contact-message-row">
              <textarea
                placeholder="Your message"
                className="contact-textarea"
                required
              />
              <button type="submit" className="contact-send-btn">
                <span className="send-icon">&#10148;</span>
              </button>
            </div>
          </form> */}

          {/* Social Links */}
          <div className="contact-socials">
            <div><FaEnvelope  className="dot" /><a href="mailto:jonathancosentinosite@gmail.com?subject=Hello%20Jonathan&body=Hi%20there!">Email</a></div>
            <div><FaFacebookF className="dot" /><a href="https://www.facebook.com/jonathan.cosentino.9"> Facebook </a></div>
            <div><FaInstagram className="dot" /><a href="https://www.instagram.com/joncos90/"> Instagram </a></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
