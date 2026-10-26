import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import { DoctorProfile, Doctors } from './pages/Doctors';
import Booking from './pages/Booking';
import PatientInfo from './pages/PatientInfo';
import { ArticleDetail, Articles } from './pages/Articles';
import About from './pages/About';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="layanan" element={<Services />} />
          <Route path="dokter" element={<Doctors />} />
          <Route path="dokter/:id" element={<DoctorProfile />} />
          <Route path="janji" element={<Booking />} />
          <Route path="pasien" element={<PatientInfo />} />
          <Route path="artikel" element={<Articles />} />
          <Route path="artikel/:slug" element={<ArticleDetail />} />
          <Route path="tentang" element={<About />} />
          <Route path="cari" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
