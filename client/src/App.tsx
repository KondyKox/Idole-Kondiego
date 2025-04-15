import { Route, Routes } from "react-router-dom";
import TierList from "./components/TierList";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TierList />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
