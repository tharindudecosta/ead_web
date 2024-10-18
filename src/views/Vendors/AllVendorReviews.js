import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./vendor.css";
import DateFormatter from "../../components/DateFormatter";

const AllVendorReviews = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(false); // State to control spinner visibility

  const location = useLocation();
  const vendor = location.state.vendor;

  useEffect(() => {
    setRecords(vendor.reviews);
    console.log(vendor.reviews);
    
  }, []);

  return (
    <div className="product-container">
      <h2>Vendor Reviews : VEND_{vendor.id.slice(- 4)}</h2>

      <table id="product_table">
        <thead>
          <tr>
            <th>Review Id</th>
            <th>Customer Id</th>
            <th>Rating / 5</th>
            <th>Comment</th>
            <th>TimeStamp</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.reviewId}>
                <td>REV_{record.reviewId.slice(- 4)}</td>
                <td>CUS_{record.customerId.slice(- 4)}</td>
                <td>{record.rating}</td>
                <td>{record.comment}</td>
                <td><DateFormatter dateString= {record.timestamp}></DateFormatter></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Reviews found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllVendorReviews;
