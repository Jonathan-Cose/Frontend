import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Essays.css';
import "../../App.css"
import { useEffect, useState } from 'react';
import useResources from '../../hooks/handleResourcesHook';
import DOMPurify from 'dompurify';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Essays = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEssay, setActiveEssay] = useState(null);
  const [essays, setEssays] = useState([]);
  const { getResources } = useResources();

  useEffect(() => {
    const fetchEssays = async () => {
      const res = await getResources('essay');
      if (res) setEssays(res);
    };
    fetchEssays();
  }, []);

  const openModal = (essay) => {
    setActiveEssay(essay);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className='essay-bg'>
    <div className="essays-page">
      <Navbar />
        <div className="essays-hero-bg">
          <div className="essays-hero">
            <h1 className="essays-title">Saggi</h1>
            <p className="essays-desc">
            <b>Saggi – Pensieri complessi per tempi complessi</b><br/>
            Questa pagina raccoglie saggi che nascono da un intreccio vivo tra esperienza e studio, tra<br/> 
            l’aula e i libri, tra l’osservazione e la pratica. Sono riflessioni che uniscono la mia anima di<br/> 
            formatore, coach e facilitatore esperienziale con anni di ricerca nel campo della leadership,<br/> 
            del management, della strategia, della storia e delle relazioni internazionali. Ma soprattutto,<br/> 
            sono scritti che cercano di leggere il mondo con occhi sistemici, complessi, non più<br/> 
            prigionieri di schemi riduzionistici e lineari.<br/>
            Ogni saggio è un tentativo di mettere in connessione idee, storie, modelli e pratiche, per<br/> 
            offrire chiavi di lettura nuove a chi lavora con le persone, nei gruppi, nelle organizzazioni.<br/>
            Sono mappe, non territori. Inviti alla riflessione, al confronto, al disaccordo fertile. Perché<br/> 
            oggi più che mai, abbiamo bisogno di pensiero critico, di sguardi ampi e di linguaggi capaci<br/> 
            di accogliere la complessità senza semplificarla.
            </p>
          </div>
      </div>

      <div className="essays-grid essays-list-row">
        {essays.map((essay, index) => {
          const colorIndex = index % 7;
          return (
            <div className={`essays-box fade-in border-color-${colorIndex}`} key={essay._id}>
              <img
                src={essay.picture}
                alt={essay.heading}
                className="essays-img"
                loading="lazy"
                onClick={() => openModal(essay)}
              />
              <div
                className={`essays-heading heading-color-${colorIndex}`}
                onClick={() => openModal(essay)}
              >
                {essay.heading}
              </div>
            </div>
          );
        })}
      </div>



      {modalOpen && activeEssay && (
        <div className="essays-modal-overlay" onClick={closeModal}>
          <div className="essays-modal" onClick={e => e.stopPropagation()}>
            <button className="essays-modal-close" onClick={closeModal}>
              <IoIosCloseCircleOutline className='close'/>
            </button>
            <img
              src={activeEssay.picture}
              alt={activeEssay.heading}
              className="essays-modal-img"
              loading="lazy"
            />
            <div className="essays-modal-heading">{activeEssay.heading}</div>
            <div className="essays-modal-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(activeEssay.essay, {
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
      )}

      <Footer />
    </div>
    </div>
  );
};

export default Essays;
