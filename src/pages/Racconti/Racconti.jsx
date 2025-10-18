import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Racconti.css';
import { useState, useEffect } from 'react';
import useResources from '../../hooks/handleResourcesHook';
import "../../App.css"
import { IoIosCloseCircleOutline } from 'react-icons/io';
import DOMPurify from 'dompurify';

const Racconti = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [stories, setStories] = useState([]);
  const { getResources } = useResources();

  useEffect(() => {
    const fetchStories = async () => {
      const res = await getResources('racconti');
      if (res) setStories(res);
    };
    fetchStories();
  }, []);

  const openModal = (story) => {
    setActiveStory(story);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className='raccinti-bg'>
    <div className="racconti-page">
      <Navbar />
      <div className="essays-hero-bg racconti-hero-bg">
          <div className="wave-hero-wrapper">
            <div className="essays-hero racconti-hero">
              <h1 className="racconti-title">Racconti</h1>
              <p className="racconti-desc">
                {/* <b>Racconti: Dove l'Ordinario Sfuma nell'Invisibile</b><br/>
                Qui trovi racconti brevi ma intensi, storie di personaggi comuni — uomini, donne, bambini,<br/> 
                animali — colti in gesti quotidiani che rivelano l'eccezionale. I protagonisti si muovono tra<br/> 
                elementi familiari che ti restituiscono una quotidianità che ti appartiene. Eppure, in ogni<br/> 
                storia si apre uno spiraglio: un dubbio, un dettaglio fuori posto, una possibilità inattesa.<br/>
                La natura è spesso una presenza silenziosa ma potente, complice o testimone. Il mistero<br/> 
                non è mai dichiarato apertamente, ma sussurrato, lasciato a invitare alla riflessione.<br/>
                Questi racconti non offrono risposte, ma pongono domande su ciò che vediamo e sentiamo,<br/> 
                su ciò che siamo e potremmo diventare.<br/>
                Ti invito a leggere con calma, a lasciarti toccare da parole leggere ma profonde. Perché a<br/> 
                volte, in un piccolo riflesso si nasconde un mondo intero. */}

                <b>Storie di persone comuni colte in gesti quotidiani che rivelano l’eccezionale nell’ordinario.</b><br/>
                Tra elementi familiari si aprono spiragli inattesi: un dubbio, un dettaglio fuori posto, una possibilità nuova.<br/>
                Non ci sono risposte, ma sguardi su ciò che vediamo e siamo.<br/>
                In un piccolo dettaglio puoi scoprire un mondo intero.

              </p>
            </div>
          </div>
      </div>


      <div className="racconti-grid">
        {stories.length === 0 ? (
          <p>No racconti available.</p>
        ) : (
          stories.map((story) => (
            <div
              className="racconti-card"
              key={story._id}
              onClick={() => openModal(story)}
            >
              <div className="racconti-card-heading">{story.heading}</div>
              <div className="racconti-card-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    story.racconti.split('</p>').slice(0, 2).join('</p>') + '</p>',
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

      {modalOpen && activeStory && (
        <div className="racconti-modal-overlay" onClick={closeModal}>
          <div className="racconti-modal" onClick={e => e.stopPropagation()}>
            <button className="racconti-modal-close" onClick={closeModal}>
              <IoIosCloseCircleOutline className='close'/>
            </button>
            <div className="diabetes-modal-heading racconti-modal-heading">
              <h2>{activeStory.heading}</h2>
            </div>
            <div className="racconti-modal-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(activeStory.racconti, {
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
      <Footer className='racconti-footer'/>
    </div>
    </div>
  );
};

export default Racconti;
