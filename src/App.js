import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";

// Components
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";

// Views
import AllProducts from "./views/Products/AllProducts";
import ProductUpdate from "./views/Products/ProductUpdate";
import AddProduct from "./views/Products/AddProduct";
import InventoryDashboard from "./views/Inventory/InventoryDashboard"; // Inventory Dashboard view
import AddInventory from "./views/Inventory/AddInventory"; // Add Inventory view
import UpdateStock from "./views/Inventory/UpdateStock"; // Update inventory stock view
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
          <Route path="/login" element={<Login /> } />
          <Route path="/" element={<Auth> <Home /> </Auth>} />
          <Route path="/product/all" element={<Auth> <AllProducts /> </Auth>} />
          <Route path="/product/update" element={<Auth> <ProductUpdate /> </Auth>} />
          <Route path="/product/add" element={<Auth> <AddProduct /> </Auth>} />
          <Route path="/user/all" element={<Auth> <AllUsers /> </Auth>} />
          <Route path="/user/add" element={<Auth> <AddUser /> </Auth>} />
          <Route path="/vendor/all" element={<Auth> <AllVendors /> </Auth>} />
          <Route path="/vendor/add" element={<Auth> <AddVendor /> </Auth>} />
          <Route path="/inventory" element={<InventoryDashboard />} /> {/* Inventory dashboard */}
          <Route path="/inventory/add" element={<AddInventory />} /> {/* Add new inventory */}
          <Route path="/inventory/update" element={<UpdateStock />} /> {/* Update inventory stock */}
          <Route path="/inventory" element={<Auth> <InventoryDashboard /> </Auth>} />
          <Route path="/inventory/update" element={<Auth> <UpdateStock /> </Auth>} />
          <Route path="/orders" element={<Auth> <OrderManagement /> </Auth>} />
          <Route path="/orders/update" element={<Auth> <OrderUpdate /> </Auth>} />
          <Route path="/vendor/update" element={<Auth> <UpdateVendor /> </Auth>} />
          <Route path="/vendor/products" element={<Auth> <AllVendorProducts /> </Auth>} />
          <Route path="/vendor/product/update" element={<Auth> <ProductUpdateVendor /> </Auth>} />
          <Route path="/vendor/reviews" element={<Auth> <AllVendorReviews /> </Auth>} />

            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
