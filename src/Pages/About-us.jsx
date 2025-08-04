import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BarChart, Target, Eye, Globe, Zap, ShieldCheck } from "lucide-react";

const AboutUs = () => {
  const [values, setValues] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch data
    setTimeout(() => {
      setValues([
        {
          id: 1,
          title: "Instant Legal Guidance",
          description:
            "Get immediate answers to your legal questions through our AI-powered platform or connect with an expert.",
          icon: "bi bi-globe",
        },
        {
          id: 2,
          title: "Find the Right Lawyer",
          description:
            "Easily search and connect with qualified, verified lawyers specializing in your specific legal need, anywhere in India.",
          icon: "bi bi-eye",
        },
        {
          id: 3,
          title: "Cashless & Transparent",
          description:
            "Experience hassle-free legal services with transparent pricing and cashless transactions, ensuring peace of mind.",
          icon: "bi bi-lightning",
        },
        {
          id: 4,
          title: "Pan-India Network",
          description:
            "Access legal expertise from thousands of advocates across all Indian cities and districts, right at your fingertips.",
          icon: "bi bi-shield-check",
        },
      ]);

      setTeamMembers([
        {
          id: 1,
          name: "Rohit Patt",
          role: "CEO",
          bio: "With a strategic vision and analytical mindset, Rohit drives innovation and growth at Justifi.",
          img: "https://randomuser.me/api/portraits/women/68.jpg",
          linkedIn: "https://www.linkedin.com/in/rohit-patt-16a2a331/",
        },
        {
          id: 2,
          name: "Sandipan Basu",
          role: "CTO",
          bio: "Sandipan brings a wealth of experience in architecting and developing scalable, high-performance technology solutions.",
          img: "https://randomuser.me/api/portraits/men/32.jpg",
          linkedIn: "https://www.linkedin.com/in/sandipan-basu-b67323335/",
        },
        {
          id: 3,
          name: "Avinash Acharya",
          role: "CLO",
          bio: "A seasoned advocate at the Rajasthan High Court, Avinash brings deep expertise in constitutional and corporate law.",
          img: "https://randomuser.me/api/portraits/women/44.jpg",
          linkedIn: "https://www.linkedin.com/in/avinash-acharya-6202a461/",
        },
        {
          id: 4,
          name: "Richa Rai",
          role: "CXO",
          bio: "Former Deloitte principal consultant leveraging finance and business leadership to enhance customer experience.",
          img: "https://randomuser.me/api/portraits/men/67.jpg",
          linkedIn: "https://www.linkedin.com/in/richa-rai-94036123/",
        },
        // {
        //   id: 5,
        //   name: "Neha Verma",
        //   role: "Advisory Board",
        //   bio: "Neha brings strategic insight and expertise across legal, tech, and business domains to the advisory board.",
        //   img: "https://randomuser.me/api/portraits/women/12.jpg",
        //   linkedIn: "https://www.linkedin.com/in/neha-verma-0423/",
        // },
      ]);

      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="about-us">
      <Header />

      {/* Hero Section */}
      <section
        className="hero-section py-5"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80') no-repeat center center / cover",
          color: "white",
          marginTop: "80px",
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold mb-4">About Justifi</h1>
              <p className="lead mb-5">
                Transforming access to justice in India through innovation,
                technology, and a nationwide network of legal professionals.
              </p>
              {/* <a href="#our-story" className="btn btn-success btn-lg me-2">Our Story</a>
              <a href="#our-team" className="btn btn-outline-light btn-lg">Meet Our Team</a> */}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3" style={{ color: "#000080" }}>
                Our Journey
              </h2>
              <div
                className="divider mb-4 mx-auto"
                style={{ height: "4px", width: "80px", background: "#008000" }}
              ></div>
              <p className="lead">
                From vision to reality: How Justifi became India's first
                cashless legal ambulance
              </p>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Founding Team"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="fw-bold mb-3" style={{ color: "#000080" }}>
                The Beginning
              </h3>
              <p className="text-muted mb-4">
                Justifi was founded in 2023 with a simple yet powerful vision:
                to make legal assistance accessible, affordable, and
                understandable for every Indian. Our founder, Raj Sharma, a
                former corporate lawyer, witnessed firsthand the challenges
                ordinary citizens faced when navigating the complex legal
                system.
              </p>
              <p className="text-muted mb-4">
                After seeing one too many people forgo their legal rights due to
                cost, complexity, or lack of access to quality counsel, Raj
                assembled a team of legal experts and technologists to build a
                solution that would democratize access to justice.
              </p>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      background:
                        "linear-gradient(135deg, #007bff 0%, #00c6ff 100%)",
                    }}
                  >
                    <BarChart className="text-white" size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="fw-bold mb-0">Today</h5>
                  <p className="mb-0">
                    Serving thousands of clients across all 28 states and 8
                    union territories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="py-5"
        style={{ backgroundColor: "#000080", color: "white" }}
      >
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-body p-4 p-lg-5">
                  <div className="icon-lg bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                    <Target className="text-white" size={32} />
                  </div>
                  <h3
                    className="card-title fw-bold mb-3"
                    style={{ color: "#000080" }}
                  >
                    Our Mission
                  </h3>
                  <p className="card-text text-muted">
                    To democratize legal assistance by leveraging cutting-edge
                    technology and a nationwide network of vetted legal
                    professionals. We aim to make legal support immediate,
                    cashless, and understandable for individuals, families, and
                    SMEs across every city and district in India.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-body p-4 p-lg-5">
                  <div className="icon-lg bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                    <Eye className="text-white" size={32} />
                  </div>
                  <h3
                    className="card-title fw-bold mb-3"
                    style={{ color: "#000080" }}
                  >
                    Our Vision
                  </h3>
                  <p className="card-text text-muted">
                    To become India's most trusted legal assistance platform,
                    where anyone can find clarity, guidance, and representation
                    regardless of their background or financial means. We
                    envision a future where justice is not a privilege but an
                    accessible right for every citizen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3" style={{ color: "#000080" }}>
                Our Core Values
              </h2>
              <div
                className="divider mb-4 mx-auto"
                style={{ height: "4px", width: "80px", background: "#008000" }}
              ></div>
              <p className="lead">
                The principles that guide every decision we make at Justifi
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {values.map((value) => (
                <div key={value.id} className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4 text-center">
                      <div
                        className="icon-md rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{
                          background:
                            "linear-gradient(135deg, #007bff 0%, #00c6ff 100%)",
                        }}
                      >
                        {/* Replaced Bootstrap icons with Lucide icons */}
                        {value.icon === "bi bi-globe" && (
                          <Globe className="text-white" size={24} />
                        )}
                        {value.icon === "bi bi-eye" && (
                          <Eye className="text-white" size={24} />
                        )}
                        {value.icon === "bi bi-lightning" && (
                          <Zap className="text-white" size={24} />
                        )}
                        {value.icon === "bi bi-shield-check" && (
                          <ShieldCheck className="text-white" size={24} />
                        )}
                      </div>
                      <h5
                        className="card-title fw-bold"
                        style={{ color: "#000080" }}
                      >
                        {value.title}
                      </h5>
                      <p className="card-text text-muted">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Team */}
      <section id="our-team" className="py-5">
        <div className="container py-5">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3" style={{ color: "#000080" }}>
                Meet Our Leadership
              </h2>
              <div
                className="divider mb-4 mx-auto"
                style={{ height: "4px", width: "80px", background: "#008000" }}
              ></div>
              <p className="lead">
                The passionate team driving innovation in legal accessibility
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-sm-6 col-lg-4 col-xl-3">
                <div className="card h-100 shadow-sm">
                  <img
                    src={member.img}
                    className="card-img-top"
                    alt={member.name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5
                      className="card-title text-center fw-bold"
                      style={{ color: "#000080" }}
                    >
                      {member.name}
                    </h5>
                    <p className="text-center text-primary fw-semibold mb-2">
                      {member.role}
                    </p>
                    <p
                      className="card-text text-muted flex-grow-1"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {member.bio}
                    </p>
                    {member.linkedIn && (
                      <div className="text-center mt-3">
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="bi bi-linkedin me-1"></i> LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container py-4">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <h2 className="fw-bold display-4" style={{ color: "#000080" }}>
                15,000+
              </h2>
              <p className="text-muted">Legal Queries Answered</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold display-4" style={{ color: "#000080" }}>
                5,200+
              </h2>
              <p className="text-muted">Verified Lawyers</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold display-4" style={{ color: "#000080" }}>
                28
              </h2>
              <p className="text-muted">States Covered</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold display-4" style={{ color: "#000080" }}>
                98.7%
              </h2>
              <p className="text-muted">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4" style={{ color: "#000080" }}>
                Join Us in Transforming Legal Access
              </h2>
              <p className="lead mb-5">
                Whether you're seeking legal assistance or want to join our
                network of advocates, Justifi is here to help.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <a
                  href="/find-lawyer"
                  className="btn btn-success btn-lg px-4 py-3"
                >
                  Find a Lawyer
                </a>
                <a
                  href="/advocate-partner"
                  className="btn btn-outline-primary btn-lg px-4 py-3"
                >
                  Join as Advocate
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
