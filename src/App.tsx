import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GuessTheFlag from "./pages/GuessTheFlag";
import GuessTheCapitals from "./pages/GuessTheCapitals";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guess-the-flag" element={<GuessTheFlag />} />
        <Route path="/guess-the-capitals" element={<GuessTheCapitals />} />
        {/* le path="*" fonctionne si jamais l'URL ne correspond a rien au dessus */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;