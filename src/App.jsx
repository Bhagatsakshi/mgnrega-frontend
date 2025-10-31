import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Upload from "./pages/Upload";
import MandiData from "./pages/MandiData";

function App() {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/mandi" element={<MandiData />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
