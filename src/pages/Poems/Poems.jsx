import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Poems.css';
import useResources from '../../hooks/handleResourcesHook';
import { useState, useEffect, useMemo } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import "../../App.css";
import DOMPurify from 'dompurify';


const Poems = () => {
  const [poems, setPoems] = useState([]);
  const [cats, setCats] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePoem, setActivePoem] = useState(null);
  const { getResources } = useResources();

  useEffect(() => {
    const fetchPoems = async () => {
      const fetchedCats = await getResources('newcategory');
      if (fetchedCats) setCats(fetchedCats);
      const fetchedPoems = await getResources('poem');
      if (fetchedPoems) setPoems(fetchedPoems);
    };
    fetchPoems();
  }, []);

  const dynamicCategories = useMemo(() => {
    const combined = [];
    cats.forEach(category => {
      if (
        category.picture !== 'noPic' &&
        category.newCategoryName &&
        !combined.find(cat => cat.label === category.newCategoryName)
      ) {
        combined.push({
          id: category._id,
          label: category.newCategoryName,
          img: category.picture,
        });
      }
    });
    return combined;
  }, [cats]);

  const handleScroll = id => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openModal = (poem) => {
    setActivePoem(poem);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className='poems-bg'>
      <div className="poems-page">
        <Navbar />
        <div className="poems-hero-bg">
          <div className="poems-hero">
            <h1 className="poems-title"><span>Poesie</span></h1>
            <p className="poems-desc">
            {/* <b>Poesie – Parole nude, scritte col cuore</b><br/>
            Questa pagina è un luogo intimo. Troverai due sezioni: la prima raccoglie poesie che ho<br/> 
            scritto io, la seconda custodisce i versi di mio nonno, Giovanni Motta, raccolti in un piccolo<br/> 
            libro che è diventato un’eredità d’anima.<br/>
            Le mie poesie non seguono regole né strutture letterarie: sono parole vere, spesso nate nel<br/> 
            silenzio, scritte con le lacrime, con la rabbia, con la gioia o nel vuoto. Alcune risalgono<br/> 
            all’adolescenza e parlano di amore perduto, di crescita, di dolore e trasformazione. Altre<br/> 
            sono più mature. Per me, scrivere è stato – ed è – un gesto di cura.<br/>
            Aprire questa finestra significa mostrarti un frammento fragile e autentico di me.<br/>
            Ti invito a camminare tra questi versi con rispetto, come si fa in un giardino che non conosci,<br/> 
            dove ogni parola è una foglia caduta dal cuore.<br/>
            Se qualcosa risuona, allora siamo già in dialogo. */}

            <b>Questa pagina è un luogo intimo.</b><br/>
              Troverai due sezioni: la prima raccoglie alcune mie poesie; la seconda custodisce alcuni versi di<br/> 
              mio nonno, Giovanni Motta, raccolti in un piccolo libro diventato un’eredità d’anima.<br/>
              Scrivere, per me, è un gesto di cura.<br/>
              Se qualcosa risuona, siamo già in dialogo.
            </p>
            <div className="poems-main-row">
              <div className="poems-categories">
                <div className="poems-cat-title">Category list</div>
                <ol className="poems-cat-list">
                  {dynamicCategories.map(cat => (
                    <li key={cat.id}>
                      <button className="poems-cat-link" onClick={() => handleScroll(cat.id)}>
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="poems-categories-sections">
          {dynamicCategories.map(cat => {
            const poemsInCategory = poems.filter(poem => poem.category === cat.label);

            return (
              <div key={cat.id} id={cat.id} className="poems-category-section">
                <div
                  className="poems-category-row"
                  style={{
                    backgroundImage: `url(${cat.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {poemsInCategory.length === 1 ? (
                    <div className="poems-single-row">
                      <img
                        src={cat.img}
                        alt={cat.label}
                        className="poems-category-img poems-img-side"
                        loading="lazy"
                      />
                      <div className="poems-category-content">
                        <h2 className="poems-category-title">{cat.label}</h2>
                        <div className="poems-category-columns">
                          <div className="poem-card" onClick={() => openModal(poemsInCategory[0])}>
                            <div className="poem-card-head">
                              <span>01.</span> <b>{poemsInCategory[0].heading || 'Untitled'}</b>
                            </div>
                            <div
                              className="poem-card-content"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  poemsInCategory[0].poem.split('</p>').slice(0, 2).join('</p>') + '</p>',
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
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={cat.img}
                        alt={cat.label}
                        className="poems-category-img poems-img-top"
                        loading="lazy"
                      />
                      <div className="poems-category-content">
                        <h2 className="poems-category-title">{cat.label}</h2>
                        {poemsInCategory.length > 0 ? (
                          <div className="poems-category-columns poems-two-col">
                            {poemsInCategory.map((poem, index) => (
                              <div key={poem._id || index} className="poem-card" onClick={() => openModal(poem)}>
                                <div className="poem-card-head">
                                  {/* <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}.</span>{' '} */}
                                  <b>{poem.heading || 'Untitled'}</b>
                                </div>
                                <div
                                  className="poem-card-content"
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                      poem.poem.split('</p>').slice(0, 2).join('</p>') + '</p>',
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
                            ))}
                          </div>
                        ) : (
                          <p className="poems-no-poems">No poems found under this category.</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {modalOpen && activePoem && (
          <div className="diabetes-modal-overlay poems-modal-overlay" onClick={closeModal}>
            <div className="diabetes-modal poems-modal" onClick={e => e.stopPropagation()}>
              <button className="diabetes-modal-close poems-modal-close" onClick={closeModal}>
                <IoIosCloseCircleOutline className='close'/>
              </button>
              <div className="diabetes-modal-heading">
                <h2>{activePoem.heading || 'Untitled'}</h2>
              </div>
              <div className="diabetes-modal-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(activePoem.poem, {
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

export default Poems;
