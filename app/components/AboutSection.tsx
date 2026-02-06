"use client";
import { useState } from "react";
import Image from "next/image";

type TextTestimonial = {
  type: "text";
  logo: string;
  company: string;
  quote: string;
  author: string;
};

type VideoTestimonial = {
  type: "video";
  videoId: string;
  author?: string;
  company?: string;
};

type Testimonial = TextTestimonial | VideoTestimonial;

const testimonials: Testimonial[] = [
  {
    type: "video",
    videoId: "2y4c5mWvZwI",
  },
  {
    type: "video",
    videoId: "jRUzwuO8iKs",
  },
  {
    type: "text",
    logo: "/HOGY LOGO.png",
    company: "HOGY Lure",
    quote: "I was impressed by Dante's eagerness and ability to adapt to our system at lightning speed. I am continually impressed with his ability to listen and execute the plan while also taking the time to show you some \"chances\" he's taken. It's evident that Dante is interested in your business for its own sake, which translates to finished projects that are always above and beyond.",
    author: "Mike Hogan, Founder & CEO at Hogy Lure Company"
  },
  {
    type: "text",
    logo: "/CC(wavy)BLK.png",
    company: "Crooked Coast",
    quote: "We love creating with Dante. The guy is a total pro who can adapt to challenging situations and capture the moment. The finished product is always killer.",
    author: "Luke Vose, Lead Guitar at Crooked Coast"
  },
  {
    type: "text",
    logo: "/Goose rocks wealth.jpg",
    company: "Goose Rocks Wealth",
    quote: "We were really fortunate to be able to work with Dante for the launch of our business. Through his creative planning, he was able to bring our story to life in a way I could not have believed possible. He is very easy to work with, and the process is very efficient. You won't regret hiring Dante.",
    author: "Jason Pinkham, Founder & CEO at Goose Rocks Wealth"
  },
  {
    type: "text",
    logo: "/BDE%20Logo.png",
    company: "Best.Day.Ever.",
    quote: "Dante Borgese brings a wealth of professionalism well beyond his years. He communicates effectively, is incredibly responsive, asks all the right questions early on, and then brings his creative vision to life in ways that shock and awe. We're fortunate to have found him. Worth the investment every time.",
    author: "Patrick Luckett, President & Co-Founder at Best.Day.Ever."
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
        <h2 className="testimonial-heading">A few nice things people have said about me.</h2>

        {/* Testimonial Carousel */}
        <div className="testimonial-carousel-wrapper">
          <div className="testimonial-carousel">
          <div className="testimonial-content">
            {(() => {
              const current = testimonials[currentTestimonial];
              if (current.type === "video") {
                return (
                  <>
                    <div className="testimonial-video-wrapper">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${current.videoId}?autoplay=0`}
                        title="Video testimonial"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    {(current.author || current.company) && (
                      <p className="testimonial-author">
                        — {[current.author, current.company].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </>
                );
              }
              return (
                <>
                  <div
                    className={
                      current.company === "Goose Rocks Wealth"
                        ? "testimonial-logo-wrapper testimonial-logo-wrapper--goose-rocks"
                        : "testimonial-logo-wrapper"
                    }
                  >
                    <Image
                      src={current.logo}
                      alt={current.company}
                      fill
                      sizes="360px"
                      className="testimonial-logo"
                    />
                  </div>
                  <p className="testimonial-quote">
                    {current.quote}
                  </p>
                  <p className="testimonial-author">
                    — {current.author}
                  </p>
                </>
              );
            })()}
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
      </div>
    </section>
  );
}
