import React from "react";


const GlobalVision = () => {

  const iconStyle = {
    width: 64,
    height: 64,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    color: "#fff",
    background: "linear-gradient(135deg, #007bff, #00c6ff)",
    boxShadow: "0 4px 12px rgba(13,148,136,0.15)",
    marginBottom: 12,
  };

  return (
    <section id="vision" className="py-5" style={{ backgroundColor: "#f8fafb" }}>
      <div className="container text-center">
        <h2 className="fw-bold display-6 mb-3">Re-imagining Justice: Our Global Vision</h2>
        
        <p className="lead text-muted mx-auto" style={{ maxWidth: 900 }}>
          At <strong>JustifiWorld Legal Innovations Private Limited</strong>, we are driven by a profound understanding
          that the pursuit and delivery of justice, while fundamental, can often be a complex, inaccessible, and
          daunting journey. We envision a world where legal support is not a privilege, but a universally accessible
          right, seamlessly integrated into the digital age. Our mission is to fundamentally <strong>re-visualize the
          age-old process and practice of seeking and serving justice</strong>, transcending traditional barriers to create
          a truly connected global legal ecosystem.
        </p>

        <div className="row gx-4 gy-4 mt-4">
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-start h-100">
              <div className="me-3" style={{ minWidth: 80 }}>
                <div style={iconStyle} aria-hidden="true"><i className="bi bi-wallet2"></i></div>
              </div>
              <div className="flex-grow-1 text-start">
                <h3 className="h5 fw-semibold">Bridging the Access Gap</h3>
                <p className="text-muted mb-0">
                  For far too long, geographical distance, financial constraints, and a lack of clear pathways have prevented
                  individuals from accessing timely legal advice. Justifi is building the digital infrastructure to dismantle
                  these barriers. We are connecting expert advocates, irrespective of their physical location, with individuals
                  who need their guidance, fostering a truly democratic legal landscape. This isn't just about convenience; it's
                  about empowerment.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex align-items-start h-100">
              <div className="me-3" style={{ minWidth: 80 }}>
                <div style={iconStyle} aria-hidden="true"><i className="bi bi-lock"></i></div>
              </div>
              <div className="flex-grow-1 text-start">
                <h3 className="h5 fw-semibold">Cultivating Unwavering Trust</h3>
                <p className="text-muted mb-0">
                  Trust is the bedrock of the legal profession. We understand the sanctity of this principle. Every advocate on
                  Justifi undergoes rigorous verification, ensuring that our users connect only with bona fide, qualified legal
                  professionals. Our platform prioritizes secure, confidential communication, and transparent processes, fostering
                  an environment where ethical practice and client-attorney privilege are paramount.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex align-items-start h-100">
              <div className="me-3" style={{ minWidth: 80 }}>
                <div style={iconStyle} aria-hidden="true"><i className="bi bi-graph-up-arrow"></i></div>
              </div>
              <div className="flex-grow-1 text-start">
                <h3 className="h5 fw-semibold">Empowering Legal Professionals</h3>
                <p className="text-muted mb-0">
                  Justifi is more than just a client acquisition channel; it's a comprehensive ecosystem designed to modernize
                  and streamline the advocate's practice. From intuitive scheduling and secure case management tools to transparent
                  payment processing and reputation-building mechanisms, we empower advocates to focus on what they do best: serving justice.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex align-items-start h-100">
              <div className="me-3" style={{ minWidth: 80 }}>
                <div style={iconStyle} aria-hidden="true"><i className="bi bi-globe2"></i></div>
              </div>
              <div className="flex-grow-1 text-start">
                <h3 className="h5 fw-semibold">A Global Blueprint for Justice</h3>
                <p className="text-muted mb-0">
                  While our initial focus is on India, our vision extends globally. The principles of accessibility, transparency,
                  and professional empowerment are universal. We are building a scalable and adaptable model that can serve as a
                  blueprint for connecting legal expertise with those in need, anywhere in the world.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalVision;
