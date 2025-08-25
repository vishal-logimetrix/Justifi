import React from "react";

const ForAdvocates = () => {
  return (
    <section id="for-advocates" className="py-5" style={{ backgroundColor: "#f8fafb" }}>
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 mb-3">
            For Advocates: Grow Your Practice with Justifi
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "750px" }}>
            Expand your reach, manage your practice efficiently, and connect
            with clients across India. Justifi offers a compliant and rewarding
            platform for legal professionals.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="row g-4 mb-5">
          {/* Basic */}
          <div className="col-lg-4">
            <div className="card h-100 text-center border-1 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h3 className="fw-bold">Basic</h3>
                <p className="display-6 text-primary mb-3">
                  ₹1,001 <small className="text-muted fs-6">one-time</small>
                </p>
                <ul className="list-unstyled text-start flex-grow-1">
                  <li>✔ Basic listing in search results</li>
                  <li>✔ Essential KYC & verification processing</li>
                  <li>✔ Limited lead access</li>
                  <li>✔ Access to secure consultation tools</li>
                </ul>
                <p className="text-muted small mt-auto">
                  Covers administrative costs including PAN & Aadhaar validation.
                </p>
              </div>
            </div>
          </div>

          {/* Standard */}
          <div className="col-lg-4">
            <div className="card h-100 text-center border-primary border-2 shadow">
              <div className="position-absolute top-0 start-50 translate-middle badge bg-primary text-white rounded-pill px-3 py-1">
                RECOMMENDED
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="fw-bold">Standard</h3>
                <p className="display-6 text-primary mb-3">
                  ₹7,999 <small className="text-muted fs-6">/ year</small>
                </p>
                <ul className="list-unstyled text-start flex-grow-1">
                  <li>✔ Enhanced visibility in search results</li>
                  <li>✔ Higher volume of qualified leads</li>
                  <li>✔ Core platform features</li>
                  <li>✔ Basic practice management tools</li>
                  <li>✔ Access to advocate support</li>
                </ul>
                <p className="text-muted small mt-auto">
                  Best for consistent client acquisition.
                </p>
              </div>
            </div>
          </div>

          {/* Premium */}
          <div className="col-lg-4">
            <div className="card h-100 text-center border-1 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h3 className="fw-bold">Premium</h3>
                <p className="display-6 text-primary mb-3">
                  ₹14,999 <small className="text-muted fs-6">/ year</small>
                </p>
                <ul className="list-unstyled text-start flex-grow-1">
                  <li>✔ Premium listing placement</li>
                  <li>✔ Highest volume of high-value leads</li>
                  <li>✔ Advanced analytics dashboard</li>
                  <li>✔ Dedicated priority support</li>
                  <li>✔ Exclusive training resources</li>
                </ul>
                <p className="text-muted small mt-auto">
                  For established advocates maximizing their online presence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding Steps */}
        <div className="text-center mb-5">
          <h3 className="fw-bold mb-3">
            Your Onboarding Journey: Simple Steps to Join Justifi
          </h3>
          <p className="text-muted mx-auto" style={{ maxWidth: "750px" }}>
            Our streamlined process ensures a quick and compliant onboarding, so
            you can start connecting with clients faster.
          </p>
        </div>

        <div className="row g-4">
          {/* Step 1 */}
          <div className="col-md-6">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <h4 className="fw-bold">1. Register & Select Plan</h4>
              <p className="text-muted">
                Fill out our quick registration form and choose the plan that
                best suits your practice.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-md-6">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <h4 className="fw-bold">2. Complete KYC</h4>
              <p className="text-muted">
                PAN and Aadhaar validation to ensure compliance and trust.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-md-6">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <h4 className="fw-bold">3. Set Up Profile</h4>
              <p className="text-muted">
                Showcase your specializations, experience, and availability.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="col-md-6">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <h4 className="fw-bold">4. Start Connecting</h4>
              <p className="text-muted">
                Receive consultation requests and grow your practice.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ForAdvocates;
