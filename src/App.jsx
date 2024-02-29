import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductTable from "./components/ProductTable";
import SinglePage from "./components/SinglePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductTable />} />
          <Route path="/:id" element={<SinglePage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
