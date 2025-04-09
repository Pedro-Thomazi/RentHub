import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Login/Register/Register"
import { UserProvider } from "./context/UserContext"
import Dashboard from "./pages/Dashboard/Dashboard"
import UpdateUser from "./pages/Dashboard/UpdateUser/UpdateUser"
import CreateAnnouncement from "./pages/CreateAnnouncement/CreateAnnouncement"
import DetailsAnnouncement from "./pages/DetailsAnnouncement/DetailsAnnouncement"
import ScrollToTop from "./middlewares/ScrollToTop"
import PageHotels from "./pages/PageAnnouncements/PageHotels"
import PageHomes from "./pages/PageAnnouncements/PageHomes"
import PageApartaments from "./pages/PageAnnouncements/PageApartaments"
import PageAnnouncements from "./pages/PageAnnouncements/PageAnnouncements"

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/atualizar-meus-dados" element={<UpdateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/criar-anuncio" element={<CreateAnnouncement />} />
          <Route path="/:titulo/:id" element={<DetailsAnnouncement />} />
          <Route path="/anuncios/:tipo" element={<PageAnnouncements />}>
            <Route path="hoteis" element={<PageHotels />} />
            <Route path="casas" element={<PageHomes />} />
            <Route path="apartamentos" element={<PageApartaments />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
