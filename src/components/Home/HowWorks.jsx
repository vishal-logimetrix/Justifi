import React from "react";
import {
  UserPlus,
  BadgeCheck,
  MailSearch,
  MessageSquare,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register & Verify",
    description: "Complete our quick signup. We’ll verify your credentials and legal standing.",
  },
  {
    icon: BadgeCheck,
    title: "Create Your Profile",
    description: "Highlight your strengths, experience, and areas of practice in a polished profile.",
  },
  {
    icon: MailSearch,
    title: "Receive Client Leads",
    description: "Get matched with potential clients based on your expertise and preferences.",
  },
  {
    icon: MessageSquare,
    title: "Connect & Assist",
    description: "Consult, chat, and collaborate with clients securely through our platform.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-5 bg-white position-relative">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">How It Works</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            A seamless onboarding experience to help you start delivering legal expertise faster.
          </p>
        </div>

        {/* Stepper container */}
        <div className="position-relative d-flex flex-column flex-md-row align-items-start justify-content-between gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center flex-fill position-relative">
                <div
                  className="d-flex bg-warning justify-content-center align-items-center mx-auto mb-3"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    // background: "linear-gradient(135deg, #007bff, #00c6ff)",
                    boxShadow: "0 0 20px rgba(0, 123, 255, 0.2)",
                    color: "#fff",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  <Icon size={28} />
                </div>

                <div className="step-title fw-semibold mb-1">{step.title}</div>
                <p className="text-muted small mb-0 px-3">{step.description}</p>

                {/* Connector line (except last step) */}
                {index !== steps.length - 1 && (
                  <div
                    className="d-none bg-success d-md-block position-absolute top-50 start-100 translate-middle-y"
                    style={{
                      height: "4px",
                      width: "100px",
                      // background: "linear-gradient(to right, #007bff, #00c6ff)",
                      zIndex: 1,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
