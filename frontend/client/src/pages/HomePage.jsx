// frontend/client/src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import HeroSlider from "../components/home/HeroSlider";
import ProductList from "../components/products/ProductList";
import { productAPI } from "../services/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    fetchProducts();
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
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

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterStatus("success");
      setTimeout(() => {
        setNewsletterStatus("");
        setEmail("");
      }, 3000);
    }
  };

  // Mock data for testimonials
  const testimonials = [
    {
      name: "Fatima Zahra",
      location: "Casablanca",
      rating: 5,
      text: "Les huiles Zit al Baraka ont transformé mes cheveux! Plus de brillance, moins de chute. Je recommande vivement!",
      product: "Huile d'Argan Premium",
    },
    {
      name: "Aisha Benali",
      location: "Rabat",
      rating: 5,
      text: "Enfin des produits naturels qui tiennent leurs promesses. Mes cheveux crépus sont plus faciles à coiffer.",
      product: "Huile de Ricin Bio",
    },
    {
      name: "Khadija El Amrani",
      location: "Marrakech",
      rating: 5,
      text: "Service client excellent et livraison rapide. Les produits sentent divinement bon!",
      product: "Coffret Découverte",
    },
  ];

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

      {/* Announcement Bar */}
      <section className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-icon">🎉</span>
          <p>
            <strong>OFFRE LIMITÉE:</strong> -30% sur votre 2ème produit avec le
            code <span className="code">DUO30</span>
          </p>
          <button className="announcement-cta">J'en profite</button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>100% Naturel</h3>
              <p>Huiles pures sans additifs chimiques</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Testé en Laboratoire</h3>
              <p>Qualité certifiée et contrôlée</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Livraison Express</h3>
              <p>48h partout au Maroc</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>Satisfait ou Remboursé</h3>
              <p>30 jours pour changer d'avis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards with Images */}
      <section className="categories-enhanced">
        <div className="container">
          <h2 className="section-title">Trouvez votre solution capillaire</h2>
          <div className="categories-grid">
            <div className="category-card-enhanced">
              <div className="category-image">
                <span className="category-emoji">💧</span>
              </div>
              <div className="category-content">
                <h3>CHEVEUX SECS</h3>
                <p>Hydratation intense et nutrition profonde</p>
                <a href="#dry" className="category-link">
                  Explorer <span>→</span>
                </a>
              </div>
            </div>

            <div className="category-card-enhanced">
              <div className="category-image">
                <span className="category-emoji">🌱</span>
              </div>
              <div className="category-content">
                <h3>POUSSE RAPIDE</h3>
                <p>Stimulez la croissance naturellement</p>
                <a href="#growth" className="category-link">
                  Explorer <span>→</span>
                </a>
              </div>
            </div>

            <div className="category-card-enhanced">
              <div className="category-image">
                <span className="category-emoji">💪</span>
              </div>
              <div className="category-content">
                <h3>ANTI-CHUTE</h3>
                <p>Renforcez vos racines efficacement</p>
                <a href="#loss" className="category-link">
                  Explorer <span>→</span>
                </a>
              </div>
            </div>

            <div className="category-card-enhanced">
              <div className="category-image">
                <span className="category-emoji">✨</span>
              </div>
              <div className="category-content">
                <h3>BRILLANCE</h3>
                <p>Des cheveux éclatants de santé</p>
                <a href="#shine" className="category-link">
                  Explorer <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals">
        <div className="container">
          <div className="section-header-enhanced">
            <span className="section-label">NOUVEAUTÉS</span>
            <h2>Dernières arrivées</h2>
            <p>Découvrez nos nouvelles formules enrichies</p>
          </div>

          <div className="arrival-banner">
            <div className="arrival-content">
              <span className="arrival-badge">NEW</span>
              <h3>Sérum Croissance Express</h3>
              <p>
                Notre nouvelle formule révolutionnaire pour une pousse 3x plus
                rapide
              </p>
              <div className="arrival-features">
                <span>✓ Résultats en 14 jours</span>
                <span>✓ Formule brevetée</span>
                <span>✓ Sans rinçage</span>
              </div>
              <button className="arrival-cta">Découvrir maintenant</button>
            </div>
            <div className="arrival-image">
              <div className="arrival-placeholder">
                <span>🧪</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section Enhanced */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header-enhanced">
            <span className="section-label">BEST-SELLERS</span>
            <h2>Les favoris de nos clientes</h2>
            <p>Plus de 10,000 femmes satisfaites</p>
          </div>

          <ProductList products={products.slice(0, 8)} />

          {products.length > 8 && (
            <div className="view-all-products">
              <button className="view-all-btn">
                Voir tous les produits ({products.length})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="container">
          <div className="video-wrapper">
            <div className="video-content">
              <h2>Notre processus de fabrication</h2>
              <p>
                Découvrez comment nous créons les meilleures huiles naturelles
                du Maroc
              </p>
              <div className="video-placeholder">
                <button className="play-button">▶</button>
                <span className="video-duration">2:34</span>
              </div>
            </div>
            <div className="video-features">
              <div className="video-feature">
                <span className="feature-number">01</span>
                <h4>Sélection rigoureuse</h4>
                <p>
                  Nous choisissons uniquement les meilleures matières premières
                </p>
              </div>
              <div className="video-feature">
                <span className="feature-number">02</span>
                <h4>Extraction à froid</h4>
                <p>Pour préserver tous les nutriments essentiels</p>
              </div>
              <div className="video-feature">
                <span className="feature-number">03</span>
                <h4>Contrôle qualité</h4>
                <p>Chaque lot est testé en laboratoire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header-enhanced">
            <span className="section-label">TÉMOIGNAGES</span>
            <h2>Ce que disent nos clientes</h2>
            <p>Plus de 500 avis 5 étoiles</p>
          </div>

          <div className="testimonials-wrapper">
            <div className="testimonials-slider">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`testimonial-card ${
                    index === activeTestimonial ? "active" : ""
                  }`}
                >
                  <div className="testimonial-rating">
                    {"⭐".repeat(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.location}</span>
                  </div>
                  <div className="testimonial-product">
                    A utilisé: {testimonial.product}
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${
                    index === activeTestimonial ? "active" : ""
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>

          <div className="testimonial-stats">
            <div className="stat">
              <h3>98%</h3>
              <p>Clientes satisfaites</p>
            </div>
            <div className="stat">
              <h3>4.8/5</h3>
              <p>Note moyenne</p>
            </div>
            <div className="stat">
              <h3>+10K</h3>
              <p>Commandes livrées</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="instagram-feed">
        <div className="container">
          <div className="section-header-enhanced">
            <span className="section-label">SUIVEZ-NOUS</span>
            <h2>@zitalbaraka sur Instagram</h2>
            <p>Rejoignez notre communauté de 50K+ followers</p>
          </div>

          <div className="instagram-grid">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="instagram-post">
                <div className="post-placeholder">
                  <span>📸</span>
                </div>
                <div className="post-overlay">
                  <span className="likes">
                    ❤️ {Math.floor(Math.random() * 500 + 100)}
                  </span>
                  <span className="comments">
                    💬 {Math.floor(Math.random() * 50 + 10)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="follow-btn">Suivre @zitalbaraka</button>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="newsletter-enhanced">
        <div className="newsletter-wrapper">
          <div className="newsletter-content-enhanced">
            <span className="newsletter-icon">💌</span>
            <h2>Rejoignez le club VIP</h2>
            <p>
              Recevez en exclusivité nos offres, conseils beauté et nouveautés
            </p>

            <form
              className="newsletter-form-enhanced"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                {newsletterStatus === "success" ? "✓ Inscrit!" : "S'inscrire"}
              </button>
            </form>

            <div className="newsletter-benefits">
              <span>🎁 -10% sur votre première commande</span>
              <span>📧 Conseils personnalisés</span>
              <span>⚡ Accès prioritaire aux ventes</span>
            </div>

            <p className="newsletter-privacy">
              Vos données sont protégées. Désabonnement possible à tout moment.
            </p>
          </div>

          <div className="newsletter-image">
            <div className="newsletter-placeholder">
              <span>🎁</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges">
        <div className="container">
          <div className="badges-grid">
            <div className="badge">
              <span className="badge-icon">🏆</span>
              <p>Marque de l'année 2024</p>
            </div>
            <div className="badge">
              <span className="badge-icon">🌍</span>
              <p>Éco-responsable</p>
            </div>
            <div className="badge">
              <span className="badge-icon">🐰</span>
              <p>Non testé sur animaux</p>
            </div>
            <div className="badge">
              <span className="badge-icon">🇲🇦</span>
              <p>Fabriqué au Maroc</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
