import './Home.css'
import "../../App.css"
import jhonathanImg from '../../assets/Jhonathan.jpeg'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from "../../components/Footer/Footer.jsx"

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>

      <div className="hero-section">
        <img src={jhonathanImg} alt="Jonathan" className="bg-image" />
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>
            <span>Jonathan</span><br />
            <span>Cosentino</span>
          </h1>
          <div className="hero-underline"></div>
          <p className="hero-subtitle">Poesie, saggi, racconti, fotografie</p>
          <div className="hero-buttons">
            {/* <button onClick={() => {
              const aboutSection = document.getElementById('aboutme');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>About Me</button> */}
            <a href="/aboutme"><button>Mi Presento</button></a>
            <a href="/contact"><button>Contatti</button></a>
          </div>
        </div>
      </div>

      

        <Footer/>
    </div>
  )
}

export default Home
