// frontend/client/src/pages/ProductDetailPage.jsx
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Detail Page</h2>
      <p>Product ID: {id}</p>
    </div>
  );
};

export default ProductDetailPage;
