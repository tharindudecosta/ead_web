import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import "./inventory.css"; // Updated CSS file
import { axiosclient } from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";

const AddInventory = () => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  const [products, setProducts] = useState([]); // Assuming products to be fetched for selection
  const [loading, setLoading] = useState(false); // Spinner control

  const location = useLocation();
  const inventoryProduct = location && location.state && location.state.inventoryProduct;

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data for productId selection
    const fetchProducts = async () => {
      try {
        const response = await axiosclient.get(`/api/Product`);
        console.log(response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
          setProducts([]);
        }

        if (inventoryProduct != null) {
          setProductId(inventoryProduct.id);
        }

      } catch (error) {
        console.error("Error fetching products:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch products.",
        });
      }
    };

    fetchProducts();
  }, []);

  const handleAddInventory = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productId || !quantity || !lowStockThreshold) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      setLoading(false); // Stop the spinner
      return;
    }

    const newInventory = {
      productId: productId,
      quantity: quantity,
      lowStockThreshold: lowStockThreshold,
      lastUpdated: lastUpdated,
    };

    try {
      await axiosclient
        .post(`/api/Inventory`, newInventory)
        .then((response) => {
          swal.fire({
            title: "Success!",
            text: "Inventory has been added.",
            icon: "success",
          });

          setLoading(false);
          setProductId("");
          setQuantity("");
          setLowStockThreshold("");
          setLastUpdated(new Date().toISOString());

          navigate("/inventory");
          
        })
        .catch((err) => {
          setLoading(false);
          console.error("Failed to add inventory", err);
        });
    } catch (error) {
      setLoading(false); // Hide spinner on error
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add inventory. Please try again.",
      });
      console.error("Error adding inventory:", error);
    }
  };

  return (
    <div className="inventory-container">
      <form className="addInventoryForm" onSubmit={handleAddInventory}>
        <h3>Add Inventory {inventoryProduct ? `: ${inventoryProduct.name}` : ""}</h3>

        <label>Product</label>
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.productName} {/* Assuming product has a 'productName' field */}
            </option>
          ))}
        </select>

        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label>Low Stock Threshold</label>
        <input
          type="number"
          value={lowStockThreshold}
          onChange={(e) => setLowStockThreshold(e.target.value)}
        />

        <label>Last Updated</label>
        <input
          type="text"
          value={lastUpdated}
          readOnly
        />

<button type="submit" className="submitBtn" disabled={loading}>
  {loading ? <CircularProgress size={24} className="circularProgress" /> : "Add Inventory"}
</button>

      </form>
    </div>
  );
};

export default AddInventory;
