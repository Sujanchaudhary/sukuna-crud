import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://64855cb4a795d24810b6de57.mockapi.io/blog/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <div>
      <h1>Product Details</h1>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>Description: {product.description}</p>

          <p>Quantity: {product.quantity}</p>
          <p>Price: {product.price}</p>
          <img
            src={product.image}
            alt={product.name}
            style={{ height: "200px", width: "auto" }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SinglePage;
