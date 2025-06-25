// frontend/client/src/components/products/ProductList.jsx
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return (
      <p className="no-products">
        Aucun produit disponible. Ajoutez des produits dans l'admin Django!
      </p>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
