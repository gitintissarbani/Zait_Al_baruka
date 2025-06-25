// frontend/client/src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import HeroSlider from "../components/home/HeroSlider";
import ProductList from "../components/products/ProductList";
import { productAPI } from "../services/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Category Cards */}
      <section className="categories">
        <div className="category-card">
          <h3>CHEVEUX SECS</h3>
          <p>Huiles nourrissantes</p>
          <a href="#dry">Découvrir →</a>
        </div>
        <div className="category-card">
          <h3>POUSSE RAPIDE</h3>
          <p>Stimulateurs naturels</p>
          <a href="#growth">Découvrir →</a>
        </div>
        <div className="category-card">
          <h3>ANTI-CHUTE</h3>
          <p>Fortifiants capillaires</p>
          <a href="#loss">Découvrir →</a>
        </div>
        <div className="category-card">
          <h3>BRILLANCE</h3>
          <p>Éclat naturel</p>
          <a href="#shine">Découvrir →</a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <div className="section-header">
          <h2>NOS BEST-SELLERS</h2>
          <p>Les produits préférés de nos clients</p>
        </div>

        <ProductList products={products} />
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>RESTEZ INFORMÉ(E)</h2>
          <p>
            Inscrivez-vous pour recevoir nos offres exclusives et conseils
            beauté
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Votre adresse e-mail" />
            <button>S'INSCRIRE</button>
          </div>
          <p className="newsletter-gift">
            🎁 -10% sur votre prochaine commande
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
