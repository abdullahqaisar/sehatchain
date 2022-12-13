import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/sehatchain/" element={<Main />} />
          <Route path="/sehatchain/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
