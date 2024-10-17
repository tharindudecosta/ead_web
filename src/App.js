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
import UpdateStock from "./views/Inventory/UpdateStock";
import OrderManagement from "./views/Orders/OrderManagement"; // New Order Management view
import OrderUpdate from "./views/Orders/OrderUpdate"; // New Order Update view
import AllUsers from "./views/Users/AllUsers";
import AddUser from "./views/Users/AddUser";
import AllVendors from "./views/Vendors/AllVendors";
import AddVendor from "./views/Vendors/AddVendor";
import UpdateVendor from "./views/Vendors/UpdateVendor";
import AllVendorProducts from "./views/Products/AllVendorProducts";
import ProductUpdateVendor from "./views/Products/ProductUpdateVendor";
import AllVendorReviews from "./views/Vendors/AllVendorReviews";

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
            <Route path="/user/all" element={<AllUsers />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/vendor/all" element={<AllVendors />} />
            <Route path="/vendor/add" element={<AddVendor />} />
            <Route path="/inventory" element={<InventoryDashboard />} />
            <Route path="/inventory/update" element={<UpdateStock />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/orders/update" element={<OrderUpdate />} />
            <Route path="/vendor/update" element={<UpdateVendor />} />
            <Route path="/vendor/products" element={<AllVendorProducts />} />
            <Route path="/vendor/product/update" element={<ProductUpdateVendor />} />
            <Route path="/vendor/reviews" element={<AllVendorReviews />} />
            {/* New route for Order Update */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
