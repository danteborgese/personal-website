"use client";
import { useState } from "react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="promo-banner">
      <div className="promo-banner-content">
        <p className="promo-banner-text">
          <strong>Subscribe now</strong> — never miss important news and weekly insights
        </p>
        <a href="#hero" className="promo-banner-link">
          Join Free
        </a>
      </div>
      <button
        className="promo-banner-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  );
}
