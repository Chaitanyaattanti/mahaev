import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import Deliverables from "./pages/Deliverables";
import Timeline from "./pages/Timeline";
import Funding from "./pages/Funding";
import Publications from "./pages/Publications";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Standards from "./pages/Standards";
import BatteryPredictor from "./pages/BatteryPredictor";

function App() {
  return (
    <Router basename="/mahaev">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/standards" element={<Standards />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/deliverables" element={<Deliverables />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/predictor" element={<BatteryPredictor />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
