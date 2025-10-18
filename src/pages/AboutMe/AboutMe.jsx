import './AboutMe.css'
import AboutmeImg from '../../assets/family.jpg'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from "../../components/Footer/Footer.jsx"
import "../../App.css"

const AboutMe = () => {
  return(
    <div className='aboutme'>
      <Navbar/>
        <div className="aboutme-section row" id="aboutme">
            <div className="aboutme-text col-md-7">
                <h2> Mi Presento</h2>
                <h4>Ciao, mi chiamo Jonathan.</h4>
                <p>
                {/* Questo spazio è nato come un diario di crescita personale,<br/> 
                un luogo dove parole e immagini si cercano, si completano, si incontrano.<br/>
                Qui, tra poesie, saggi, racconti e fotografie, troverai voci distinte che talvolta si intrecciano:<br/> 
                testo e immagine si prendono per mano per esprimere ciò che, da sole, non riuscirebbero a dire.<br/>

                La scrittura e la fotografia sono per me strumenti di miglioramento continuo e di scoperta — di <br/> 
                sé, degli altri, del mondo.<br/>
                Attribuisco a queste arti il valore della cura: una carezza sull’anima,<br/> 
                una fiammella che trema quando intorno è buio, l’acqua che vince la polvere.<br/>

                Se sei arrivato fin qui, forse qualcosa ci unisce.<br/> 
                Prenditi il tempo per esplorare.<br/>
                E se ciò che trovi ti parla, lasciami un commento o un messaggio.<br/>
                Dedico questo spazio alla mia meravigliosa famiglia.<br/>
                È la mia bussola: se mi allontano, so sempre dove tornare.<br/>

                La porto con me, cucita nel taschino in alto a sinistra.<br/> */}

                  Questo spazio è un diario di crescita personale,<br/>
                  un luogo dove parole e immagini si cercano, si completano, si incontrano.<br/>
                  Qui, tra poesie, saggi, racconti e fotografie, troverai voci distinte che, talvolta, si intrecciano:<br/>
                  testo e immagini si prendono per mano per esprimere ciò che, da sole, non riuscirebbero a dire.<br/>
                  La scrittura e la fotografia sono per me strumenti di scoperta e miglioramento continuo.<br/>
                  Attribuisco a queste arti il valore della cura: una carezza sull’anima,<br/>
                  la fiammella che trema quando intorno è buio, l’acqua che vince la polvere.<br/>
                  Se sei arrivato fin qui, forse qualcosa ci unisce.<br/>
                  Prenditi il tempo per esplorare.<br/>
                  E se ciò che trovi ti parla, lasciami un commento o un messaggio.<br/>
                  Dedico questo spazio alla mia meravigliosa famiglia.<br/>
                  È la mia bussola: se mi allontano, so sempre dove tornare.<br/>
                  La porto con me, nel taschino in alto a sinistra.
                </p>
                <a href="/contact"><button className="aboutme-btn">Qui</button></a>
            </div>
            <div className="aboutme-image col-md-5">
                <img src={AboutmeImg} alt="About Me" />
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default AboutMe 