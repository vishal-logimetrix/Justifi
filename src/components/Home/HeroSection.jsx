import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Gavel, Scale } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {

    useEffect(() => {
      AOS.init({ duration: 600, once: true });
    }, []);

  return (
    <section
      className="hero-section text-white text-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://png.pngtree.com/thumb_back/fh260/background/20241126/pngtree-gavel-scales-of-justice-and-law-books-symbol-of-law-and-image_16642879.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "80px",
      }}
      
    >
      <div className="container">
        {/* Badge */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="bg-white bg-opacity-25 p-3 rounded-circle me-3 shadow">
            <Gavel size={32} className="text-white" />
          </div>
          <span className="text-uppercase fw-semibold fs-6 tracking-wider">
            Partner Program
          </span>
        </div>

        {/* Glass Content */}
        <div
          className="bg-white bg-opacity-10 rounded-4 p-4 p-md-5 shadow-lg"
          data-aos="fade-down"
          // style={{ backdropFilter: 'blur(10px)', maxWidth: '800px', margin: '0 auto' }}
        >
          <h1 className="display-4 fw-bold mb-3">
            Partner with Justifi: Empower Your Practice,
            <br />
            <span className="text-white">Expand Your Reach</span>
          </h1>

          <p className="lead text-white-50 mb-4">
            Join India's fastest-growing legal assistance platform and connect
            with clients across every city and district. Take your practice to
            new heights with Justifi.
          </p>

          <Link
            to="/register"
            className="btn btn-light text-primary btn-lg fw-bold px-4 py-3 d-inline-flex align-items-center"
          >
            <Scale size={20} className="me-2" /> Join as Partner Advocate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
