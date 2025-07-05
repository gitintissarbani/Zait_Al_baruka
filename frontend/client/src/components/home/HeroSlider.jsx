// frontend/client/src/components/home/HeroSlider.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      label: "NOUVELLE COLLECTION 2024",
      title: "Révélez la beauté naturelle de vos cheveux",
      subtitle: "Huiles 100% pures et biologiques",
      description:
        "Découvrez notre gamme premium d'huiles capillaires enrichies en vitamines et nutriments essentiels pour des cheveux éclatants de santé.",
      cta: "DÉCOUVRIR LA COLLECTION",
      secondaryCta: "VOIR LA VIDÉO",
      image: "hero1",
      bgColor: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
      features: [
        "Sans produits chimiques",
        "Résultats visibles en 14 jours",
        "Satisfait ou remboursé",
      ],
    },
    {
      id: 2,
      label: "OFFRE EXCLUSIVE",
      title: "-30% sur votre deuxième produit",
      subtitle: "Offre limitée jusqu'au 31 décembre",
      description:
        "Profitez de nos promotions exceptionnelles sur toute la gamme Zit al Baraka. L'occasion parfaite pour découvrir nos best-sellers!",
      cta: "J'EN PROFITE MAINTENANT",
      secondaryCta: "CONDITIONS",
      image: "hero2",
      bgColor: "linear-gradient(135deg, #FFE5B4 0%, #FFD700 100%)",
      discount: "-30%",
      code: "DUO30",
    },
    {
      id: 3,
      label: "BEST-SELLER",
      title: "L'huile d'Argan pure du Maroc",
      subtitle: "Le secret de beauté ancestral",
      description:
        "Riche en vitamine E et acides gras essentiels, notre huile d'argan bio nourrit, répare et protège vos cheveux au quotidien.",
      cta: "ACHETER MAINTENANT",
      secondaryCta: "EN SAVOIR PLUS",
      image: "hero3",
      bgColor: "linear-gradient(135deg, #D4A574 0%, #8B7355 100%)",
      rating: "4.9/5",
      reviews: "1,248 avis",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(
          (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSlideChange = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <section className="hero-slider-enhanced">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide-enhanced ${
            index === currentSlide ? "active" : ""
          }`}
          style={{ background: slide.bgColor }}
        >
          <div className="hero-container">
            <div className="hero-content-enhanced">
              <span className="hero-label-enhanced">{slide.label}</span>

              <h1 className="hero-title">{slide.title}</h1>

              <h2 className="hero-subtitle">{slide.subtitle}</h2>

              <p className="hero-description">{slide.description}</p>

              {/* Special elements for each slide */}
              {slide.discount && (
                <div className="hero-discount">
                  <span className="discount-amount">{slide.discount}</span>
                  <span className="discount-code">Code: {slide.code}</span>
                </div>
              )}

              {slide.rating && (
                <div className="hero-rating">
                  <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-text">{slide.rating}</span>
                  <span className="rating-reviews">({slide.reviews})</span>
                </div>
              )}

              {slide.features && (
                <ul className="hero-features">
                  {slide.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              )}

              <div className="hero-buttons">
                <button
                  className="hero-cta-primary"
                  onClick={() => navigate("/products")}
                >
                  {slide.cta}
                </button>
                <button className="hero-cta-secondary">
                  {slide.secondaryCta}
                </button>
              </div>
            </div>

            <div className="hero-image-enhanced">
              <div className="hero-image-wrapper">
                <div className="hero-image-placeholder-enhanced">
                  <span className="hero-emoji">
                    {index === 0 ? "🌿" : index === 1 ? "🎁" : "✨"}
                  </span>
                </div>

                {/* Decorative elements */}
                <div className="hero-decoration-1"></div>
                <div className="hero-decoration-2"></div>
              </div>
            </div>
          </div>

          {/* Slide counter */}
          <div className="slide-counter">
            <span className="current-slide">0{index + 1}</span>
            <span className="slide-separator">/</span>
            <span className="total-slides">0{heroSlides.length}</span>
          </div>
        </div>
      ))}

      {/* Enhanced slider controls */}
      <div className="slider-controls">
        <button
          className="slider-arrow-enhanced left"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className="slider-arrow-enhanced right"
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Enhanced slider dots */}
      <div className="slider-dots-enhanced">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`dot-enhanced ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="dot-fill"></span>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="slider-progress">
        <div
          className="progress-fill"
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
            transition: "width 6s linear",
          }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSlider;
