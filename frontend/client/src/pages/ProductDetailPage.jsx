// frontend/client/src/pages/ProductDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { productAPI } from "../services/api";
import ProductList from "../components/products/ProductList";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await productAPI.getAll();
      // Filter out current product and limit to 4
      const related = response.data
        .filter((p) => p.id !== parseInt(id))
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);

    // Show notification
    setNotification("Produit ajouté au panier!");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
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

  if (!product) return null;

  // Mock product images for gallery
  const productImages = [
    product.image,
    product.image, // In real app, these would be different images
    product.image,
    product.image,
  ];

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Accueil</a> / <a href="/#products">Nos Huiles</a> /{" "}
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="product-detail-section">
        <div className="container">
          <div className="product-detail-grid">
            {/* Product Images */}
            <div className="product-images">
              <div className="image-gallery">
                <div className="thumbnail-list">
                  {productImages.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${
                        selectedImage === index ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      {img ? (
                        <img
                          src={`http://localhost:8000${img}`}
                          alt={`${product.name} ${index + 1}`}
                        />
                      ) : (
                        <div className="image-placeholder">🍃</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="main-image">
                  {product.image ? (
                    <img
                      src={`http://localhost:8000${productImages[selectedImage]}`}
                      alt={product.name}
                    />
                  ) : (
                    <div className="main-image-placeholder">🍃</div>
                  )}
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="stock-badge">
                      Plus que {product.stock} en stock!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-detail">
              <h1 className="product-title">{product.name}</h1>

              <div className="product-rating-detail">
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <span className="rating-text">(4.8/5 - 124 avis)</span>
              </div>

              <div className="product-price-detail">
                <span className="original-price-detail">
                  {(parseFloat(product.price) * 1.25).toFixed(2)} MAD
                </span>
                <span className="current-price-detail">
                  {product.price} MAD
                </span>
                <span className="discount-label">-20%</span>
              </div>

              <p className="product-short-description">{product.description}</p>

              {/* Key Benefits */}
              <div className="key-benefits">
                <h3>Bénéfices clés:</h3>
                <ul>
                  <li>✓ 100% Naturel et Bio</li>
                  <li>✓ Sans produits chimiques</li>
                  <li>✓ Testé dermatologiquement</li>
                  <li>✓ Résultats visibles en 2 semaines</li>
                </ul>
              </div>

              {/* Add to Cart Section */}
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <label>Quantité:</label>
                  <div className="quantity-controls-detail">
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)}>+</button>
                  </div>
                </div>

                <button
                  className="add-to-cart-btn-detail"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0
                    ? "RUPTURE DE STOCK"
                    : "AJOUTER AU PANIER"}
                </button>
              </div>

              {/* Shipping Info */}
              <div className="shipping-info">
                <div className="shipping-item">
                  <span className="icon">🚚</span>
                  <div>
                    <strong>Livraison gratuite</strong>
                    <p>Pour toute commande supérieure à 200 MAD</p>
                  </div>
                </div>
                <div className="shipping-item">
                  <span className="icon">📦</span>
                  <div>
                    <strong>Retours gratuits</strong>
                    <p>Sous 30 jours</p>
                  </div>
                </div>
                <div className="shipping-item">
                  <span className="icon">🔒</span>
                  <div>
                    <strong>Paiement sécurisé</strong>
                    <p>Transactions 100% sécurisées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="product-tabs-section">
        <div className="container">
          <div className="tabs">
            <div className="tab-headers">
              <button
                className={`tab-header ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`tab-header ${
                  activeTab === "utilisation" ? "active" : ""
                }`}
                onClick={() => setActiveTab("utilisation")}
              >
                Mode d'utilisation
              </button>
              <button
                className={`tab-header ${
                  activeTab === "ingredients" ? "active" : ""
                }`}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingrédients
              </button>
              <button
                className={`tab-header ${activeTab === "avis" ? "active" : ""}`}
                onClick={() => setActiveTab("avis")}
              >
                Avis clients (124)
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "description" && (
                <div className="tab-panel">
                  <h3>Description détaillée</h3>
                  <p>{product.description}</p>
                  <p>
                    Cette huile naturelle est spécialement formulée pour nourrir
                    vos cheveux en profondeur. Riche en vitamines et minéraux
                    essentiels, elle pénètre la fibre capillaire pour réparer
                    les cheveux abîmés et leur redonner brillance et vitalité.
                  </p>
                  <h4>Pourquoi choisir {product.name}?</h4>
                  <ul>
                    <li>Formule 100% naturelle sans additifs chimiques</li>
                    <li>
                      Extraction à froid pour préserver tous les nutriments
                    </li>
                    <li>Convient à tous types de cheveux</li>
                    <li>Non testé sur les animaux</li>
                    <li>Packaging écologique et recyclable</li>
                  </ul>
                </div>
              )}

              {activeTab === "utilisation" && (
                <div className="tab-panel">
                  <h3>Comment utiliser {product.name}?</h3>
                  <div className="usage-steps">
                    <div className="step">
                      <span className="step-number">1</span>
                      <p>Appliquez quelques gouttes sur vos mains</p>
                    </div>
                    <div className="step">
                      <span className="step-number">2</span>
                      <p>Massez délicatement le cuir chevelu</p>
                    </div>
                    <div className="step">
                      <span className="step-number">3</span>
                      <p>Répartissez sur les longueurs et pointes</p>
                    </div>
                    <div className="step">
                      <span className="step-number">4</span>
                      <p>Laissez poser 30 minutes minimum</p>
                    </div>
                    <div className="step">
                      <span className="step-number">5</span>
                      <p>Rincez avec votre shampoing habituel</p>
                    </div>
                  </div>
                  <p className="usage-tip">
                    💡 <strong>Conseil:</strong> Pour un traitement intensif,
                    laissez poser toute la nuit et lavez le matin.
                  </p>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div className="tab-panel">
                  <h3>Composition</h3>
                  <div className="ingredients-list">
                    <div className="ingredient-item">
                      <strong>Huile d'Argan Bio</strong>
                      <p>Riche en vitamine E et acides gras essentiels</p>
                    </div>
                    <div className="ingredient-item">
                      <strong>Huile de Ricin</strong>
                      <p>Stimule la pousse et fortifie les cheveux</p>
                    </div>
                    <div className="ingredient-item">
                      <strong>Huile de Coco Vierge</strong>
                      <p>Nourrit en profondeur et apporte de la brillance</p>
                    </div>
                    <div className="ingredient-item">
                      <strong>Vitamine E</strong>
                      <p>Antioxydant naturel qui protège les cheveux</p>
                    </div>
                  </div>
                  <p className="ingredients-note">
                    <strong>Sans:</strong> Parabènes, Sulfates, Silicones,
                    Colorants artificiels, Parfums synthétiques
                  </p>
                </div>
              )}

              {activeTab === "avis" && (
                <div className="tab-panel">
                  <div className="reviews-summary">
                    <div className="rating-overview">
                      <h3>4.8/5</h3>
                      <div className="stars">⭐⭐⭐⭐⭐</div>
                      <p>Basé sur 124 avis</p>
                    </div>
                    <div className="rating-breakdown">
                      <div className="rating-bar">
                        <span>5 ⭐</span>
                        <div className="bar">
                          <div style={{ width: "85%" }}></div>
                        </div>
                        <span>85%</span>
                      </div>
                      <div className="rating-bar">
                        <span>4 ⭐</span>
                        <div className="bar">
                          <div style={{ width: "10%" }}></div>
                        </div>
                        <span>10%</span>
                      </div>
                      <div className="rating-bar">
                        <span>3 ⭐</span>
                        <div className="bar">
                          <div style={{ width: "3%" }}></div>
                        </div>
                        <span>3%</span>
                      </div>
                      <div className="rating-bar">
                        <span>2 ⭐</span>
                        <div className="bar">
                          <div style={{ width: "1%" }}></div>
                        </div>
                        <span>1%</span>
                      </div>
                      <div className="rating-bar">
                        <span>1 ⭐</span>
                        <div className="bar">
                          <div style={{ width: "1%" }}></div>
                        </div>
                        <span>1%</span>
                      </div>
                    </div>
                  </div>

                  <div className="reviews-list">
                    <div className="review-item">
                      <div className="review-header">
                        <strong>Fatima B.</strong>
                        <span className="review-date">Il y a 3 jours</span>
                      </div>
                      <div className="review-rating">⭐⭐⭐⭐⭐</div>
                      <p className="review-text">
                        Excellente huile! Mes cheveux sont transformés après
                        seulement 2 semaines d'utilisation. Plus doux, plus
                        brillants et surtout moins de chute!
                      </p>
                    </div>

                    <div className="review-item">
                      <div className="review-header">
                        <strong>Aisha M.</strong>
                        <span className="review-date">Il y a 1 semaine</span>
                      </div>
                      <div className="review-rating">⭐⭐⭐⭐⭐</div>
                      <p className="review-text">
                        Je recommande vivement! L'odeur est agréable et
                        naturelle. Mes cheveux crépus sont beaucoup plus faciles
                        à coiffer.
                      </p>
                    </div>

                    <div className="review-item">
                      <div className="review-header">
                        <strong>Khadija L.</strong>
                        <span className="review-date">Il y a 2 semaines</span>
                      </div>
                      <div className="review-rating">⭐⭐⭐⭐</div>
                      <p className="review-text">
                        Très bonne qualité, on sent que c'est du naturel. Le
                        seul bémol c'est que j'aurais aimé un flacon plus grand.
                      </p>
                    </div>
                  </div>

                  <button className="load-more-reviews">
                    Voir plus d'avis
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="container">
            <h2>Produits similaires</h2>
            <ProductList products={relatedProducts} />
          </div>
        </section>
      )}

      {/* Notification */}
      {notification && <div className="notification show">{notification}</div>}
    </div>
  );
};

export default ProductDetailPage;
