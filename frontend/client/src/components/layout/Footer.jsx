// frontend/client/src/components/layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>SERVICE CLIENT</h4>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contactez-nous</a>
          <a href="#livraison">Livraison</a>
          <a href="#retours">Retours & Remboursements</a>
        </div>

        <div className="footer-section">
          <h4>À PROPOS</h4>
          <a href="#histoire">Notre Histoire</a>
          <a href="#valeurs">Nos Valeurs</a>
          <a href="#qualite">Qualité & Certification</a>
          <a href="#presse">Presse</a>
        </div>

        <div className="footer-section">
          <h4>SUIVEZ-NOUS</h4>
          <div className="social-links">
            <a href="#">📘 Facebook</a>
            <a href="#">📷 Instagram</a>
            <a href="#">🐦 Twitter</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>PAIEMENT SÉCURISÉ</h4>
          <p>💳 Carte Bancaire</p>
          <p>💰 Cash à la livraison</p>
          <p>🔒 Paiement 100% sécurisé</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2024 Zit al Baraka - Tous droits réservés |{" "}
          <a href="#cgv">CGV</a> | <a href="#mentions">Mentions légales</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
