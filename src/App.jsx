import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./pages/Home/Home";
import Explorar from "./pages/Explorar/Explorar";
import GameDetails from "./pages/GameDetails/GameDetails";
import Favoritos from "./pages/Favoritos/Favoritos";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explorar" element={<Explorar />} />
        <Route path="jogo/:id" element={<GameDetails />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
