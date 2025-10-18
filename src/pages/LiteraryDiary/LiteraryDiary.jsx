import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './LiteraryDiary.css';
import "../../App.css";
import { useEffect, useState } from 'react';
import useResources from '../../hooks/handleResourcesHook';

const LiteraryDiary = () => {
  const [entries, setEntries] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const { getResources } = useResources();

  useEffect(() => {
    const fetchEntries = async () => {
      const res = await getResources('literarydiary');
      if (res) setEntries(res);
    };
    fetchEntries();
  }, []);

  // useEffect(() => {
  //   const adjustSlideHeights = () => {
  //     const slides = document.querySelectorAll('.literary-diary-slide');
  //     let maxHeight = 0;
  
  //     slides.forEach((slide) => {
  //       slide.style.height = 'auto'; 
  //       const height = slide.offsetHeight;
  //       if (height > maxHeight) maxHeight = height;
  //     });
  
  //     slides.forEach((slide) => {
  //       slide.style.height = `${maxHeight}px`;
  //     });
  //   };
  
  //   setTimeout(adjustSlideHeights, 200);
  
  //   window.addEventListener('resize', adjustSlideHeights);
  //   return () => window.removeEventListener('resize', adjustSlideHeights);
  // }, [entries]);
  

  
  // Group entries by category
  const reflexesEntries = entries.filter(e => e.category === 'reflexes');
  const vangelEntries = entries.filter(e => e.category === 'vangel');

  const openFullscreen = (imageSrc, imageAlt) => {
    setFullscreenImage({ src: imageSrc, alt: imageAlt });
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className='literary-diary-bg'>
      <div className="literary-diary-page page-fade-in">
        <Navbar />

        <section className="literary-diary-hero">
          <h1 className="literary-diary-title gradient-text">Riflessi di versi </h1>
          <p className="literary-diary-desc">
            {/* <b>Riflessi di versi – L’eco di un dolore che cerca luce</b><br/>
            Quando mio figlio Giovanni ha esordito col diabete, ho avuto bisogno di un punto<br/> 
            d’appoggio. L’ho cercato, come spesso accade nella mia vita, nella poesia, nella letteratura,<br/> 
            nella fotografia.<br/>
            Davanti al dolore ingiusto che colpisce i bambini, le parole sembrano cedere. Eppure, in quel<br/> 
            silenzio, Riflessi di versi ha trovato voce. La mia, e — a quanto mi è stato detto — anche<br/> 
            quella di altri.<br/>
            Questa raccolta è composta da 48 riflessi, come il “morto che parla” nella cabala<br/> 
            napoletana, e 20 Versetti di Vangelo Urbano, il numero della festa. È una metafora della vita,<br/> 
            tra ombre e chiarori, tra perdita e resistenza.<br/>
            Ogni riflesso nasce da uno scatto fotografico, accompagnato da parole: mie, della grande<br/> 
            letteratura o della strada.<br/>
            Torna a visitarli. Meditali. Ogni volta potresti scoprire una sfumatura nuova. Anche dentro di te. */}

            <b>Questa raccolta nasce dall’incontro tra fotografia e parola.</b><br/>
            Ogni riflesso unisce uno scatto e un frammento di testo — tra fragilità e resistenza, ombra e luce,<br/> 
            perdita e speranza.<br/>
            Non sono risposte, ma inviti alla risonanza: immagini e parole che tentano di dare forma a ciò<br/> 
            che non si lascia dire, in equilibrio tra il vissuto e il narrabile.<br/>
            Riflessi di versi è una finestra: torna a guardarci dentro, potresti scoprire una sfumatura nuova — anche in te.

          </p>
        </section>

        <section className="literary-diary-slider-bg">
          <div className="literary-diary-slider-container">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 10000 }}
              loop={true}
              speed={700}
            >
              {reflexesEntries.length === 0 ? (
                <SwiperSlide>
                  <div className="literary-diary-slide card-glass">
                    <div className="literary-diary-slide-content">
                      <div className="literary-diary-slide-heading">No entries found for Reflections in Verse.</div>
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                reflexesEntries.map((entry) => (
                  <SwiperSlide key={entry._id}>
                    <div className="literary-diary-slide card-glass">
                      <img 
                        src={entry.picture} 
                        alt={entry.heading} 
                        className="literary-diary-slide-img" 
                        onClick={() => openFullscreen(entry.picture, entry.heading)}
                        style={{ cursor: 'pointer' }}
                      />
                      <div className="literary-diary-slide-content">
                        <div className="literary-diary-slide-heading">{entry.heading}</div>
                        <div className="literary-diary-slide-text">
                          <div dangerouslySetInnerHTML={{ __html: entry.literaryDiary }} />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </section>
        <section className="literary-diary-slider-bg">
          <div className="literary-diary-slider-container">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 10000 }}
              loop={true}
              speed={700}
            >
              {vangelEntries.length === 0 ? (
                <SwiperSlide>
                  <div className="literary-diary-slide card-glass">
                    <div className="literary-diary-slide-content">
                      <div className="literary-diary-slide-heading">No entries found for Urban Vangel.</div>
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                vangelEntries.map((entry) => (
                  <SwiperSlide key={entry._id}>
                    <div className="literary-diary-slide card-glass">
                      <img 
                        src={entry.picture} 
                        alt={entry.heading} 
                        className="literary-diary-slide-img" 
                        onClick={() => openFullscreen(entry.picture, entry.heading)}
                        style={{ cursor: 'pointer' }}
                      />
                      <div className="literary-diary-slide-content">
                        <div className="literary-diary-slide-heading">{entry.heading}</div>
                        <div className="literary-diary-slide-text">
                          <div dangerouslySetInnerHTML={{ __html: entry.literaryDiary }} />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </section>

        {fullscreenImage && (
          <div className="fullscreen-modal" onClick={closeFullscreen}>
            <div className="fullscreen-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="fullscreen-close-btn" onClick={closeFullscreen}>
                <span className="material-symbols-outlined">x</span>
              </button>
              <img 
                src={fullscreenImage.src} 
                alt={fullscreenImage.alt} 
                className="fullscreen-image"
              />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default LiteraryDiary;
