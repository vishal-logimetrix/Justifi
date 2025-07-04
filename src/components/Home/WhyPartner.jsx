import React from "react";
import {
  Users,
  DollarSign,
  Monitor,
  Award,
  Globe,
  Clock,
} from "lucide-react";

const WhyPartner = () => {
  const benefits = [
    {
      icon: <Users size={28} />,
      title: "Access to a Vast Client Base",
      description:
        "Connect with individuals and SMEs across India actively seeking legal help. Expand your practice beyond traditional limits.",
    },
    {
      icon: <DollarSign size={28} />,
      title: "Enhanced Earning Potential",
      description:
        "Boost your caseload and revenue. Enjoy transparent payments and consistent lead generation.",
    },
    {
      icon: <Monitor size={28} />,
      title: "Leverage Technology",
      description:
        "Manage cases efficiently using our AI-powered platform for documentation and client collaboration.",
    },
    {
      icon: <Award size={28} />,
      title: "Build Your Brand",
      description:
        "Showcase your legal record. Earn visibility, trust, and credibility through client reviews.",
    },
    {
      icon: <Globe size={28} />,
      title: "India's Legal Revolution",
      description:
        "Join the fastest-growing legal tech movement aimed at democratizing access to justice nationwide.",
    },
    {
      icon: <Clock size={28} />,
      title: "Work on Your Terms",
      description:
        "Accept only the cases that match your skills and schedule. Enjoy complete flexibility.",
    },
  ];

  return (
    <section className="py-5 bg-light position-relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark">Why Partner with Justifi?</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Elevate your practice with purpose-built tools and access to real clients.
          </p>
        </div>

        <div className="row g-4">
          {benefits.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div
                className="card h-100 border-0 shadow-lg rounded-4 p-4 bg-white position-relative benefit-card hover-lift"
                style={{
                  background:
                    "linear-gradient(145deg, #f9f9f9 0%, #ffffff 100%)",
                }}
              >
                <div
                  className="icon-circle mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #007bff 0%, #00c6ff 100%)",
                    color: "#fff",
                  }}
                >
                  {item.icon}
                </div>
                <h5 className="text-center fw-semibold">{item.title}</h5>
                <p className="text-muted text-center small">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div
        className="position-absolute top-0 end-0"
        style={{
          width: "180px",
          height: "180px",
          background: "radial-gradient(circle at center, #e3f2fd 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
          zIndex: 0,
        }}
      />
    </section>
  );
};

export default WhyPartner;
