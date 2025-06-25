// frontend/client/src/components/home/HeroSlider.jsx
import { useState, useEffect } from "react";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "NOUVELLE COLLECTION",
      subtitle: "HUILES NATURELLES PREMIUM",
      description:
        "Découvrez notre gamme d'huiles 100% naturelles pour des cheveux éclatants de santé",
      cta: "DÉCOUVRIR",
      image: "hero1",
    },
    {
      title: "OFFRE SPÉCIALE",
      subtitle: "-20% SUR TOUT LE SITE",
      description:
        "Profitez de nos promotions exceptionnelles sur toute la gamme Zit al Baraka",
      cta: "J'EN PROFITE",
      image: "hero2",
    },
    {
      title: "LIVRAISON GRATUITE",
      subtitle: "DÈS 200 MAD D'ACHAT",
      description:
        "Recevez vos produits directement chez vous sans frais supplémentaires",
      cta: "COMMANDER",
      image: "hero3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          <div className="hero-content">
            <span className="hero-label">{slide.title}</span>
            <h2>{slide.subtitle}</h2>
            <p>{slide.description}</p>
            <button className="hero-cta">{slide.cta}</button>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <span>🌿</span>
            </div>
          </div>
        </div>
      ))}

      {/* Slider dots */}
      <div className="slider-dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Slider arrows */}
      <button
        className="slider-arrow left"
        onClick={() =>
          setCurrentSlide(
            (currentSlide - 1 + heroSlides.length) % heroSlides.length
          )
        }
      >
        ‹
      </button>
      <button
        className="slider-arrow right"
        onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
      >
        ›
      </button>
    </section>
  );
};

export default HeroSlider;
