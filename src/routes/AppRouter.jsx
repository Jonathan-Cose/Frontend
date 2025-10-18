import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from '../context/authContext'
import Home from '../pages/Home/Home.jsx'
import Gallery from '../pages/Gallery/Gallery.jsx'
import Essays from '../pages/Essays/Essays.jsx'
// import Rubrics from '../pages/Rubrics/Rubrics.jsx'
import AboutMe from '../pages/AboutMe/AboutMe.jsx'
import Contact from '../pages/Contact/Contact.jsx'
import Login from '../pages/Login/Login.jsx'
import Photographs from '../pages/Photographs/Photographs.jsx'
import Poems from '../pages/Poems/Poems.jsx'
import Racconti from '../pages/Racconti/Racconti.jsx'
import LiteraryDiary from '../pages/LiteraryDiary/LiteraryDiary.jsx'
import Diabetes from '../pages/Diabetes/Diabetes.jsx'
import Admin from '../pages/Admin/Admin.jsx'
import NotFound from '../pages/NotFound/NotFound.jsx'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx'
import useResources from "../hooks/handleResourcesHook.js";
import { useAuthContext } from '../context/authContext';
// import About from '../pages/About'
// import Projects from '../pages/Projects'
// import Contact from '../pages/Contact'

const AppRouter = () => {

  const { getResources } = useResources();
  const { authUser } = useAuthContext();
  const [diabetesVisible, setDiabetesVisible] = useState(false);

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

  // console.log("data", data);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/essays" element={<Essays />} />
          {/* <Route path="/rubrics" element={<Rubrics />} /> */}
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/photographs" element={<Photographs />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/racconti" element={<Racconti />} />
          <Route path="/literary-diary" element={<LiteraryDiary />} />
          {(diabetesVisible || authUser) && <Route path="/diabetes" element={<Diabetes />} />}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default AppRouter
