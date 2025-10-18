import Navbar from '../../components/Navbar/Navbar';
import galary01 from '../../assets/poesie.jpg';
import galary02 from '../../assets/saggi.jpg';
import galary03 from '../../assets/rubriche.jpg';
import galary04 from '../../assets/racconti.jpg';
import galary05 from '../../assets/fotografie.jpg';
import galary06 from '../../assets/diabete.jpg';
import './Gallery.css';
import "../../App.css"
import Footer from "../../components/Footer/Footer.jsx"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import useResources from "../../hooks/handleResourcesHook.js";
import { useAuthContext } from '../../context/authContext';

const Gallery = () => {
  const navigate = useNavigate();
  const { getResources } = useResources();
  const { authUser } = useAuthContext();
  const [diabetesVisible, setDiabetesVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVisibility = async () => {
      const res = await getResources("diabetesvisibiity");
      if (res && Array.isArray(res) && res[0]?.visibility === true) {
        setDiabetesVisible(true);
      } else {
        setDiabetesVisible(false);
      }
    };
    fetchVisibility();
  }, []);

  // console.log("data from gallery", data);

  const images = [
    { src: galary01, alt: 'Gallery 1', label: 'Poesie', link: '/poems' },
    { src: galary02, alt: 'Gallery 2', label: 'Saggi', link: '/essays' },
    { src: galary03, alt: 'Gallery 3', label: 'Rubriche', link: '/literary-diary' },
    { src: galary04, alt: 'Gallery 4', label: 'Racconti', link: '/racconti' },
    { src: galary05, alt: 'Gallery 5', label: 'Fotografie', link: '/photographs' },
    // Diabete only if visible or logged in
    ...((diabetesVisible || authUser) ? [{ src: galary06, alt: 'Gallery 6', label: 'Diabete', link: '/diabetes' }] : []),
  ];

  const [centerIdx, setCenterIdx] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
    centerMode: true,
    centerPadding: '18%',
    focusOnSelect: true,
    afterChange: idx => setCenterIdx(idx),
  };

  return (
    <div className="gallery-page">
      <Navbar />
      <div className="gallery-slider-container">
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div
              key={idx}
              className="gallery-slide"
              onClick={centerIdx === idx ? () => navigate(img.link) : undefined}
              style={{ cursor: centerIdx === idx ? 'pointer' : 'default' }}
            >
              <img src={img.src} alt={img.alt} className="gallery-slide-img" />
              {centerIdx === idx && (
                <div className="gallery-slide-overlay">
                  <span className="gallery-slide-text">{img.label}</span>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
      <div className="gallery-bar"></div>
      <div className="gallery-content">
        <div className="gallery-title-section">
          <h2>Panoramica</h2>
          <div className="gallery-underline"></div>
        </div>
        <div className="gallery-links">
          <a href="/photographs"><MdOutlineKeyboardDoubleArrowRight className='arrowicon'/>Fotografie</a>
          <a href="/racconti"><MdOutlineKeyboardDoubleArrowRight className='arrowicon'/>Racconti</a>
          <a href="/poems"><MdOutlineKeyboardDoubleArrowRight className='arrowicon'/>Poesie</a>
          <a href="/essays"><MdOutlineKeyboardDoubleArrowRight className='arrowicon'/>Saggi</a>
          <a href="/literary-diary"><MdOutlineKeyboardDoubleArrowRight className='arrowicon'/>Rubriche</a>
          {(diabetesVisible || authUser) && (
            <a href="/diabetes"><MdOutlineKeyboardDoubleArrowRight className='arrowicon' /> Diabete</a>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Gallery; 