import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TechPage from "./pages/technology/TechPage";
import DevPage from "./pages/developer/DevPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/devteam" element={<DevPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
