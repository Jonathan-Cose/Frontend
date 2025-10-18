import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Diabetes.css';
import "../../App.css"
import { useEffect, useState } from 'react';
import useResources from "../../hooks/handleResourcesHook.js";
import DOMPurify from 'dompurify';


const Diabetes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [data, setData] = useState([]);
  const { getResources } = useResources();

  const openModal = (item) => {
    setActiveItem(item);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchResources = async () => {
      const res = await getResources("diabetes");
      if (res) {
        setData(res);
      }
    };

    fetchResources();
  }, []);
  // console.log("data in diabetes", data)

  return (
    <div className='diabets-bg'>
      <div className="diabetes-page">
        <Navbar />
        <div className="diabetes-hero-bg">
          <div className="diabetes-hero">
            <h1 className="diabetes-title">Diabete</h1>
            <p className="diabetes-desc">
              {/* <b>Strategie per una libertà possibile</b><br/>
              Questa sezione raccoglie i miei percorsi e le strategie che utilizzo per gestire il diabete in modo<br/> 
              consapevole e proattivo.<br/> 
              L’obiettivo non è soltanto seguire protocolli, ma imparare a integrarli nella vita quotidiana, per<br/>
              recuperare margini di libertà e benessere.<br/> 
              Il metodo si fonda su un equilibrio tra teoria e pratica: dalla comprensione dei meccanismi<br/>
              fisiologici all’ascolto dei segnali del corpo; dall’uso consapevole della tecnologia alla capacità di<br/> 
              adattare schemi alimentari, terapeutici e comportamentali.<br/> 
              I risultati che orientano questo approccio si misurano in termini concreti: una glicata stabile sotto<br/>
              il 6% e ipoglicemie ridotte a circa l’1%.<br/> 
              Non sono numeri assoluti, ma indicatori di una strategia che funziona e che può essere<br/> 
              personalizzata da ciascuno.<br/>
              La conoscenza fa guadagnare margini di libertà. */}


              <b>Strategie per una libertà possibile</b><br/>
              Raccolgo i percorsi e le strategie con cui gestisco il diabete in modo consapevole e proattivo.<br/>
              Non solo protocolli, ma integrazione nella vita quotidiana: equilibrio tra teoria e pratica,<br/>
              tecnologia e ascolto del corpo.<br/>
              L’obiettivo è recuperare margini di libertà e benessere.<br/>
              I risultati? Glicata stabile sotto il 6% e ipoglicemie intorno all’1%: indicatori di una strategia<br/>
              efficace e adattabile.<br/>
              La conoscenza è moneta per libertà.
            </p>
          </div>
        </div>
        <div className="diabetes-grid">
          {data.length === 0 ? (
            <p>No diabetes data available.</p>
          ) : (
            data.map((item) => (
              <div
                className="diabetes-card"
                key={item._id}
                onClick={() => openModal(item)}
              >
                <div className="diabetes-card-heading">{item.heading}</div>
                <div
                  className="diabetes-card-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      item.diabetes.split('</p>').slice(0, 2).join('</p>') + '</p>',
                      {
                        USE_PROFILES: { html: true },
                        ALLOWED_TAGS: [
                          'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li',
                          'h1', 'h2', 'h3', 'code', 'pre', 'blockquote',
                          'table', 'thead', 'tbody', 'tr', 'td', 'th',
                          'img'
                        ],
                        ALLOWED_ATTR: ['class', 'style', 'src', 'alt', 'title'],
                      }
                    ),                    
                  }}
                ></div>
              </div>
            ))
          )}
        </div>

        {modalOpen && activeItem && (
          <div className="diabetes-modal-overlay" onClick={closeModal}>
            <div className="diabetes-modal" onClick={e => e.stopPropagation()}>
              <button className="diabetes-modal-close" onClick={closeModal}>&#10005;</button>
              <div className="diabetes-modal-heading">
                <h2>{activeItem.heading}</h2>
              </div>
              <div className="diabetes-modal-content">
                <div style={{ overflowX: 'auto' }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(activeItem.diabetes, {
                      USE_PROFILES: { html: true },
                      ALLOWED_TAGS: [
                        'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li',
                        'h1', 'h2', 'h3', 'code', 'pre', 'blockquote',
                        'table', 'thead', 'tbody', 'tr', 'td', 'th',
                        'img'
                      ],
                      ALLOWED_ATTR: ['class', 'style', 'src', 'alt', 'title'],
                    }),
                  }}
                ></div>
              </div>

            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Diabetes;
