import Home from './pages/Home'
import Write from './pages/Write'
import Adddailylog from './pages/Adddailylog'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Dailylog from './pages/Dailylog'
import { FirebaseContextProvider } from './contexts/FirebaseContext'

function App() {

  return <>
    <FirebaseContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/dailylog" element={<Dailylog />} />
        <Route path="/adddailylog" element={<Adddailylog />} />
      </Routes>
    </FirebaseContextProvider>
  </>


}

export default App;
