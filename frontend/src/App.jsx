import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import Deliverables from "./pages/Deliverables";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Standards from "./pages/Standards";

function App() {
  return (
    <Router basename="/mahaev">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/standards" element={<Standards />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/deliverables" element={<Deliverables />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
