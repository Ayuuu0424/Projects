import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
