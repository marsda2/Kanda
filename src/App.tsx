import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Locations from './pages/Locations';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body min-h-screen flex flex-col">
        <Header />
        <main className="pt-32 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
