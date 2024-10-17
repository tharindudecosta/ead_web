import { useNavigate } from "react-router-dom";
import "./product.css"
const AllProductsSingle = ({ record }) => {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/product/update", { state: { product: record } });
  };

  return (
    <tr>
      <td>{record.productname}</td>
      <td>{record.unitprice}</td>
      <td>{record.category}</td>
      <td>VEND_{record.vendor.slice(0, 4)}</td>
      <td>{record.isactive ? "Active" : "Inactive"}</td>
      <td>
        <button className="redButton">Delete</button>
      </td>
      <td>
        <a onClick={handleClick}>
          <button className="blueButton">Update</button>
        </a>
      </td>
    </tr>
  );
};
export default AllProductsSingle;
