import { useEffect } from "react";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { setupInterceptors } from "./services/api";
import Home from "./pages/Home/Home";
import LinkInfo from "./pages/LinkInfo/LinkInfo";
import Guard from "./pages/Guard/Guard";
import Notfound from "./pages/Notfound/Notfound";
import appLogo from "./assets/logo.webp";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center bg-light py-5">
      <header>
        <NavLink to="/">
          <img src={appLogo} alt="shortlink logo" className="w-[121px]" />
        </NavLink>
      </header>
      <main className="w-11/12 md:w-2/3 lg:w-1/2 px-4 py-8 rounded-lg bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info/:id" element={<LinkInfo />} />
          <Route path="/:id" element={<Guard />} />
          <Route path="/not-found" element={<Notfound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </main>
      <footer>
        <small className="font-light text-sm text-gray-800">
          Made by{" "}
          <a
            href="https://www.ihebmejri.com/"
            target="_blank"
            className="text-gray-950 font-medium underline"
          >
            {" "}
            iheb mejri{" "}
          </a>
        </small>
      </footer>
    </div>
  );
}

export default App;
