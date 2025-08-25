import React from "react";

const ForUsers = () => {
  return (
    <section id="for-users" className="py-5 bg-white">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 mb-3">
            For Users: Your Legal Questions, Answered.
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: 750 }}>
            Access expert legal advice conveniently and affordably. Justifi
            connects you with verified advocates who can provide guidance on a
            wide range of legal matters.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-light p-4 rounded shadow-sm text-center h-100">
              <div className="fs-1 text-teal mb-3">
                <i className="bi bi-search"></i>
              </div>
              <h5 className="fw-semibold">Search &amp; Select</h5>
              <p className="text-muted">
                Browse our network of verified advocates by specialization,
                location, or court to find the perfect match for your needs.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-light p-4 rounded shadow-sm text-center h-100">
              <div className="fs-1 text-teal mb-3">
                <i className="bi bi-person"></i>
              </div>
              <h5 className="fw-semibold">Book a Consultation</h5>
              <p className="text-muted">
                Easily schedule a 30-minute online consultation call at a time
                that suits you. Our platform ensures a seamless booking
                experience.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-light p-4 rounded shadow-sm text-center h-100">
              <div className="fs-1 text-teal mb-3">
                <i className="bi bi-currency-rupee"></i>
              </div>
              <h5 className="fw-semibold">Affordable Fees</h5>
              <p className="text-muted">
                Each 30-minute consultation is priced at a nominal fee of{" "}
                <span className="fw-bold text-success">₹1,500</span>.
                Transparent pricing, no hidden costs.
              </p>
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="bg-teal-50 p-5 rounded shadow-sm text-center mb-5 border border-teal">
          <h3 className="fw-bold text-teal mb-3">How Your Fee Works:</h3>
          <p className="lead text-teal mb-3">
            For every ₹1,500 consultation call:
          </p>
          <ul
            className="list-unstyled text-start mx-auto"
            style={{ maxWidth: 500 }}
          >
            <li className="mb-2">
              <span className="fw-semibold">80% (₹1,200)</span> gets transferred
              directly to the Advocate.
            </li>
            <li>
              <span className="fw-semibold">20% (₹300)</span> is retained by
              Justifi as the platform fee, covering operational costs and
              continuous innovation.
            </li>
          </ul>
          <p className="text-muted mt-3 mb-0">
            Justifi ensures secure and timely payment processing, so you can
            focus purely on receiving quality legal advice.
          </p>
        </div>

        {/* AI Assistance */}
        <div className="bg-light p-5 rounded shadow-sm">
          <h3 className="fw-bold text-center mb-3">
            ✨ Clarify Your Legal Issue
          </h3>
          <p
            className="text-muted text-center mx-auto"
            style={{ maxWidth: 650 }}
          >
            Unsure how to describe your legal problem? Briefly explain your
            situation below, and our AI assistant can help suggest relevant
            legal categories and keywords to guide your search.
          </p>

          <textarea
            id="user-issue-input"
            className="form-control mb-3"
            rows="4"
            placeholder="e.g., 'My landlord is refusing to return my security deposit after I moved out.'"
          ></textarea>
          <div className="d-flex justify-content-center align-items-center">
            <button
              id="clarify-issue-btn"
              className="btn btn-primary fw-semibold "
            >
              ✨ Clarify My Legal Issue
            </button>
          </div>

          <div
            id="user-issue-output"
            className="bg-teal-50 p-4 rounded mt-4 d-none"
          >
            <p className="fw-semibold text-success mb-2">
              Suggested Categories:
            </p>
            <ul id="user-categories" className="mb-3"></ul>
            <p className="fw-semibold text-success mb-2">Keywords:</p>
            <p id="user-keywords"></p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ForUsers;
