import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Photographs.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from 'react-modal';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useState, useEffect, useMemo, useRef } from 'react';
import useResources from '../../hooks/handleResourcesHook';
import '../../App.css';
import pic1 from "../../assets/venezia 1.jpg";
// import pic2 from "../../assets/foto 2.jpg";
// import pic3 from "../../assets/foto 3.jpg";

Modal.setAppElement('#root');

const Photographs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [pictures, setPictures] = useState([]);
  const [open,setopen] = useState(false);
  const [cats, setCats] = useState([]);
  const { getResources } = useResources();
  const swiperRefs = useRef({});

  const [modalCategoryImages, setModalCategoryImages] = useState([]);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCats = await getResources('newcategory');
      if (fetchedCats) setCats(fetchedCats);
      const res = await getResources('picture');
      if (res) setPictures(res);
    };
    fetchData();
  }, []);

  // Only use categories for 'pictures' with a name
  const dynamicCategories = useMemo(() => {
    return cats.filter(cat => cat.categoryFor === 'pictures' && cat.newCategoryName)
      .map(cat => ({
        id: cat._id,
        label: cat.newCategoryName,
        img: cat.picture,
      }));
  }, [cats]);

  // const openModal = (img) => {
  //   setopen(true)
  //   setModalImg(img);
  //   setModalIsOpen(true);
  // };
  const openModal = (categoryLabel, img) => {
    const images = pictures.filter(pic => pic.category === categoryLabel);
    const startIndex = images.findIndex(pic => pic.picture === img);
    setModalCategoryImages(images);
    setModalStartIndex(startIndex);
    setModalIsOpen(true);
    setopen(true);
  };
  
  const closeModal = () => {
    setopen(false)
    setModalIsOpen(false);
  }

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // After pictures or categories change, update all Swipers
    Object.values(swiperRefs.current).forEach(swiper => {
      if (swiper && swiper.update) swiper.update();
    });
  }, [pictures, cats]);

  return (
    <div
      className= 'photographs-bg'
      style={{
        backgroundImage: `url(${pic1})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        minHeight: '100vh',         
        width: '100%',
      }}
      >
    <div className="photographs-page">
      <Navbar />
      <div className="photographs-hero-bg">
        <div className="photographs-hero">
          <h1 className="photographs-title">Fotografie</h1>
          <p className="photographs-desc">
          {/* <b>Visioni imperfette, racconti in bianco e nero e a colori</b><br/>
          Ho scoperto che lo sguardo con cui scatto nasce dalla stessa sorgente che mi ispira quando<br/> 
          scrivo.<br/> 
          Cambia il mezzo, non la fonte.<br/>
          È sempre l’occhio — interiore prima ancora che visivo — a cercare composizione, significato,<br/> 
          risonanza.<br/> 
          Mi interessa comunicare. Raccontare.<br/> 
          Dare voce — o meglio, luce — a quelle situazioni quotidiane che viviamo senza consapevolezza.<br/>
          Siamo circondati da contrasti e da bellezza, ma forse, assuefatti, ce ne dimentichiamo e non ci <br/>
          facciamo più caso.<br/> 
          Io, invece, ci voglio fare caso.<br/> 
          Amo il bianco e nero: credo restituisca con più forza l’universalità e i contrasti dell’umano.<br/>
          Spesso accompagno le immagini con parole; altre volte sono le parole a cercare le immagini.<br/>
          Insieme si completano, pur restando insufficienti.<br/>
          C’è sempre qualcosa che sfugge — e forse è proprio lì il senso.<br/>
          Vorrei andare oltre.<br/>
          Ma per farlo, temo, dovrei superare lo scrivere e il fotografare. */}

          <b>Visioni imperfette, racconti in bianco e nero e a colori</b><br/>
          Penna e obiettivo hanno la stessa sorgente: cambia il mezzo, non la fonte.<br/>
          Mi interessa comunicare, dare voce — o luce — a ciò che ci scivola accanto senza consapevolezza.<br/>
          Amo il bianco e nero: rivela con più forza i contrasti dell’umano.<br/>
          Immagini e parole si cercano, si completano, ma qualcosa sempre sfugge — forse lì sta il senso.<br/>
          Vorrei andare oltre. Oltre lo scrivere, oltre il fotografare. Chissà.

          </p>
          <div className="photographs-main-row">
            <div className="photographs-categories">
              <div className="photographs-cat-title">Category list</div>
              <ol className="photographs-cat-list">
                {dynamicCategories.map(cat => (
                  <li key={cat.id}>
                    <button className="photographs-cat-link" onClick={() => handleScroll(cat.id)}>{cat.label}</button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="photographs-categories-sections">
        {dynamicCategories.map(cat => {
          const picturesInCategory = pictures.filter(pic => pic.category === cat.label);
          return (
            <div key={cat.id} id={cat.id} className="photographs-category-section">
              <h2>{cat.label}</h2>
              <div className="photographs-slider-wrapper">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                loop={true}
                speed={600}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                onSwiper={swiper => { swiperRefs.current[cat.id] = swiper; }}
              >
                  {picturesInCategory.map((pic, idx) => (
                    <SwiperSlide key={pic._id}>
                      <div className="photographs-slider-card card-glass">
                        <div
                          className="photographs-slider-img-bg"
                          style={{ backgroundImage: `url(${pic.picture})` }}
                          // onClick={() => openModal(pic.picture)}
                          onClick={() => openModal(cat.label, pic.picture)}
                          role="img"
                          aria-label={`${cat.label} ${idx + 1}`}
                          tabIndex={0}
                        ></div>
                        <LazyLoadImage
                          src={pic.picture}
                          alt={`${cat.label} ${idx + 1}`}
                          effect="blur"
                          className="photographs-slider-img"
                          onClick={() => openModal(pic.picture)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className={open ? 'darkcanvas' : ''}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="photographs-modal"
          overlayClassName="photographs-modal-overlay"
          ariaHideApp={false}
        >
          <button className="photographs-modal-close" onClick={closeModal}>&times;</button>
          <Zoom>
            <img src={modalImg} alt="Zoomed" className="photographs-modal-img" />
          </Zoom>
        </Modal>
      </div> */}
      <div className={open ? 'darkcanvas' : ''}>
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={() => {
      setModalIsOpen(false);
      setopen(false);
    }}
    className="photographs-modal"
    overlayClassName="photographs-modal-overlay"
    ariaHideApp={false}
  >
    <button className="photographs-modal-close" onClick={() => {
      setModalIsOpen(false);
      setopen(false);
    }}>
      &times;
    </button>

    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      initialSlide={modalStartIndex}
      spaceBetween={30}
      slidesPerView={1}
      className="photographs-modal-swiper"
    >
      {modalCategoryImages.map((pic, idx) => (
        <SwiperSlide key={pic._id}>
          <img
            src={pic.picture}
            alt={`Image ${idx + 1}`}
            className="photographs-modal-img"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </Modal>
</div>

      <Footer />
    </div>
    </div>
  );
};

export default Photographs;