import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./ProductTable.css"; // Import CSS file for styling
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editProduct, setEditProduct] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
  });

  const handleEdit = (product) => {
    console.log(product.description);
    setEditProduct(product);
    setFormData({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      description: product.description,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchData = useCallback(async () => {
    let res = await axios.get(
      "https://64855cb4a795d24810b6de57.mockapi.io/blog"
    );
    if (res.status === 200) {
      setProducts(res.data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    let res = await axios.put(
      `https://64855cb4a795d24810b6de57.mockapi.io/blog/${editProduct.id}`,
      formData
    );

    if (res.status === 200) {
      fetchData();
      handleCloseModal();
    }
  };

  const handleDelete = async (id) => {
    let res = await axios.delete(
      `https://64855cb4a795d24810b6de57.mockapi.io/blog/${id}`
    );
    if (res.status === 200) {
      fetchData();
    }
  };

  return (
    <>
      <div
        className="modal-wrapper"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-backdrop" onClick={handleCloseModal}></div>
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Edit Product</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
              <button type="button" onClick={handleSave}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Image</th>
            <th>Description</th>

            <th>Quantity</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <img
              src="data:image/png;base64,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"
              alt=""
              style={{ width: "400px", height: "400px" }}
            />
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Link
                    style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
                    to={`/${product.id}`}
                  >
                    {product.name}
                  </Link>
                </td>
                <td>
                  <img
                    src={product.image}
                    alt=""
                    style={{ height: "100px", width: "100px" }}
                  />
                </td>
                <td style={{ width: "300px" }}>{product.description}</td>

                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
