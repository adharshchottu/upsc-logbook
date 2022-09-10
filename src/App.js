import Home from './pages/Home'
import Adddailylog from './pages/Adddailylog'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import Dailylog from './pages/Dailylog'
import { FirebaseContextProvider } from './contexts/FirebaseContext'
import Optional from './pages/Optional'
import Quotebar from './Components/Quotebar'

function App() {

  return <>
    <FirebaseContextProvider>
      <Navbar />
      <Quotebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dailylog" element={<Dailylog />} />
        <Route path="/optional" element={<Optional />} />
        <Route path="/adddailylog" element={<Adddailylog />} />
      </Routes>
      <Footer />
    </FirebaseContextProvider>
  </>


}

export default App;
