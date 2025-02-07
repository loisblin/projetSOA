import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./page/authpage";
import HomePage from "./page/homepage"; // Import de la page d'accueil
import SellPage from "./page/sellpage"; // Import de la page de vente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sell" element={<SellPage/>} />
        
        {/* Plus tard, tu pourras ajouter des routes protégées ou d'autres pages */}
      </Routes>
    </Router>
  );
};

export default App;
