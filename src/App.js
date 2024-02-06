import "./App.css";
import { Login } from "./components/login";
import { Weather } from "./components/weather";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Weather />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
