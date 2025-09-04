import React from "react";

const ComplianceAndLegal = () => {
  return (
    <section id="compliance" className="bg-white py-5">

      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-danger mb-3">
            Compliance & Legal: Our Commitment to Ethical Practice.
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
            At Justifi, we are fully committed to upholding the dignity and
            professional ethics of the legal profession in India. Our platform
            operates in strict adherence to all applicable laws and regulations,
            particularly those mandated by the Bar Council of India (BCI).
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-light border-start border-4 border-danger p-4 rounded shadow-sm mb-4">
          <h3 className="fw-bold text-danger mb-3">
            Important Regulatory Disclaimer (Bar Council of India Rule 36):
          </h3>
          <p className="text-muted mb-3">
            The Bar Council of India Rules, particularly Rule 36 of Chapter II,
            Part VI, explicitly prohibit advocates from advertising or
            soliciting work, either directly or indirectly. Justifi, as a
            technology platform, fully respects and complies with this
            fundamental principle.
          </p>
          <p className="fw-semibold text-muted mb-2">Therefore, please note:</p>
          <ul className="mb-3">
            <li>
              Justifi serves purely as an intermediary platform to facilitate
              communication between users seeking legal advice and registered
              advocates. It is a lead generation and practice management tool.
            </li>
            <li>
              Advocates on Justifi are strictly prohibited from engaging in any
              form of direct or indirect advertising, solicitation, or
              canvassing for work through this platform, as per BCI regulations.
            </li>
            <li>
              All consultations initiated and paid for through Justifi must
              remain strictly on the platform. Any attempt to move communication
              or transactions off-platform is a violation of our Terms of
              Service and may have severe implications for both users and
              advocates, including disciplinary action for advocates by the
              relevant Bar Councils.
            </li>
            <li>
              Advocates registered on Justifi are compensated for every
              consultation call booked and conducted through the platform, based
              on the agreed revenue share. There are no "free calls" provided
              where the advocate is not compensated by the platform. The initial
              administrative fee for advocates is solely for KYC and platform
              access, not for service delivery.
            </li>
            <li>
              Justifi does not endorse, recommend, or guarantee the services of
              any specific advocate. Users are advised to conduct their own due
              diligence before engaging in any consultation.
            </li>
          </ul>
          <p className="text-muted">
            Our rigorous verification process (KYC) ensures that only eligible
            and verified legal professionals are onboarded, but users engage
            with advocates at their own discretion.
          </p>
        </div>

        {/* Transparency Section */}
        <div className="bg-light p-4 rounded shadow-sm text-center">
          <h3 className="fw-bold mb-3">Transparency and Trust:</h3>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            We believe in complete transparency. For detailed information
            regarding our operational guidelines, user agreements, and advocate
            responsibilities, please refer to our full Legal Documents:
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button
              id="open-tos"
              className="btn btn-success fw-semibold px-4 py-2"
            >
              Terms of Service
            </button>
            <button
              id="open-privacy"
              className="btn btn-success fw-semibold px-4 py-2"
            >
              Privacy Policy
            </button>
          </div>
        </div>
        
      </div>
      
    </section>
  );
};

export default ComplianceAndLegal;
