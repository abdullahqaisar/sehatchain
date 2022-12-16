import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/main/Main";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Researcher from "./pages/user/ResearcherPage";

import UserNavbar from "./components/user/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="sehatchain">
            <Route index element={<Main />} />
            <Route path="user">
              <Route path="" element={<UserNavbar />} />
              <Route path="dashboard" element={<Researcher />} />
              <Route index element={<Footer />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
