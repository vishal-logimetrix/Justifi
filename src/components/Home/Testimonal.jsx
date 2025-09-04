import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const testimonials = [
  {
    text: "Joining Justifi has transformed my practice. The flow of quality leads is consistent, and the platform makes client management incredibly easy. Highly recommend!",
    author: "Advocate Priya Sharma",
    court: "Delhi High Court",
  },
  {
    text: "As a lawyer in a smaller city, Justifi has opened up a national client base for me. I'm able to help more people and grow my firm far beyond what I thought possible.",
    author: "Advocate Rajesh Kumar",
    court: "Nagpur",
  },
  {
    text: "The transparency in billing and the support from the Justifi team are exceptional. It's a truly professional platform that values its advocate partners.",
    author: "Advocate Suman Devi",
    court: "Bangalore Civil Court",
  },
  {
    text: "Justifi has helped me specialize further by consistently matching me with cases in my niche. It's a game-changer for focused legal practices.",
    author: "Advocate Arjun Singh",
    court: "Mumbai (IP Law)",
  },
];

const Testimonial = () => {

  return (
    <section
      id="testimonials"
      className="py-5 position-relative testimonial-section bg-light"
    //   data-aos="fade-down"
    >
      <div className="container text-center mb-5">
        <h2 className="display-5 fw-bold text-dark">What Our Advocates Say</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
          Real voices. Real impact. Here's how Justifi is changing the game for
          legal professionals.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000 }}
        pagination={{ clickable: true }}
        navigation
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div
              className="testimonial-card glass-effect p-5 mx-auto text-center"
              style={{ maxWidth: "800px" }}
            >
              <div className="quote-icon mb-3">
                <Quote size={40} className="text-seccess opacity-75" />
              </div>
              <p className="fs-5 fst-italic text-dark">"{t.text}"</p>
              <div className="author mt-4">
                <h5 className="mb-0 fw-bold text-seccess">{t.author}</h5>
                <small className="text-muted">{t.court}</small>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
