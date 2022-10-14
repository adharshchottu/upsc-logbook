import Home from './pages/Home'
import Adddailylog from './pages/Adddailylog'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import Dailylog from './pages/Dailylog'
import { FirebaseContextProvider } from './contexts/FirebaseContext'
import Optional from './pages/Optional'
import Quotebar from './Components/Quotebar'
import { Helmet } from 'react-helmet'
import Resources from './pages/Resources'

function App() {

  return <>
    <FirebaseContextProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>#StickToThePlan</title>
        <meta charset="utf-8" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="UPSC #StickToThePlan"
        />
        <link rel="apple-touch-icon" href="logo.png" />
      </Helmet>
      <Navbar />
      <Quotebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dailylog" element={<Dailylog />} />
        <Route path="/optional" element={<Optional />} />
        <Route path="/adddailylog" element={<Adddailylog />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
      <Footer />
    </FirebaseContextProvider>
  </>


}

export default App;
