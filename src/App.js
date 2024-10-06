import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";

// Components
import Navbar from "./components/Navbar";

// Views
import AllProducts from "./views/Products/AllProducts";
import ProductUpdate from "./views/Products/ProductUpdate";
import AddProduct from "./views/Products/AddProduct";
import InventoryDashboard from "./views/Inventory/InventoryDashboard";
import UpdateStock from "./views/Inventory/UpdateStock";  // New stock update page

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/all" element={<AllProducts />} />
            <Route path="/product/update" element={<ProductUpdate />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/inventory" element={<InventoryDashboard />} />
            <Route path="/inventory/update" element={<UpdateStock />} /> {/* New route for updating stock */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
