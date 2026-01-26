"use client";
import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    logo: "/HOGY LOGO.png",
    company: "HOGY Lure",
    quote: "Dante brings a unique blend of strategic thinking and hands-on execution. His ability to understand systems and drive growth has been invaluable to our team.",
    author: "HOGY Lure Company"
  },
  {
    logo: "/Ram Island Studios Logo.png",
    company: "Ram Island Studios",
    quote: "Working with Dante transformed our go-to-market approach. He has a rare talent for seeing the big picture while nailing the details that matter.",
    author: "Ram Island Studios"
  }
];

export default function AboutSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Bento Photo Grid */}
        <div className="bento-grid">
          <div className="bento-item bento-item-1">
            <Image
              src="/Dante-Profile Pic.jpeg"
              alt="Dante Borgese"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="bento-item bento-item-2">
            <Image
              src="/golf photo.jpeg"
              alt="Golf"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="bento-item bento-item-3">
            <Image
              src="/hunting photo.jpeg"
              alt="Outdoors"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="bento-item bento-item-4">
            <Image
              src="/sauna photo.jpeg"
              alt="Wellness"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="testimonial-carousel">
          <div className="testimonial-content">
            <div className="testimonial-logo-wrapper">
              <Image
                src={testimonials[currentTestimonial].logo}
                alt={testimonials[currentTestimonial].company}
                fill
                sizes="120px"
                className="testimonial-logo"
              />
            </div>
            <p className="testimonial-quote">
              {testimonials[currentTestimonial].quote}
            </p>
            <p className="testimonial-author">
              — {testimonials[currentTestimonial].author}
            </p>
          </div>
          <div className="testimonial-nav">
            <button
              onClick={prevTestimonial}
              className="testimonial-arrow"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={nextTestimonial}
              className="testimonial-arrow"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
