import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: 'What are the eligibility criteria to join Justifi?',
    answer:
      'You must be a licensed advocate enrolled with any Bar Council of India, with relevant experience in your chosen practice areas. Our verification process ensures all our partners are credible and qualified.',
  },
  {
    question: 'How does Justifi generate client leads?',
    answer:
      'We leverage extensive digital marketing, partnerships, and our user-friendly platform to attract individuals and businesses seeking legal help. Our AI matches client needs with your expertise and availability.',
  },
  {
    question: 'Is there a fee to register as a Partner Advocate?',
    answer:
      'Yes, there is a one-time registration fee to join the Justifi Partner Advocate Program. This nominal fee covers identity verification, onboarding, and access to our full suite of tools and services. By contributing this small cost, you gain priority listing, access to premium client leads, and dedicated support from our team. It ensures we maintain the quality and trust of our platform, benefiting both clients and advocates in the long run.',
  },
  {
    question: 'How are payments handled on the platform?',
    answer:
      'Justifi facilitates secure and transparent payment processing. Clients pay through the platform, and your earnings are disbursed directly to you, minus our agreed-upon commission.',
  },
  {
    question: 'What kind of support does Justifi offer to advocates?',
    answer:
      'We provide technical support for using the platform, marketing assistance to optimize your profile, and a dedicated relationship manager to ensure a smooth partnership experience.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-5 bg-white position-relative">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Frequently Asked Questions</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Answers to common questions about joining the Justifi Partner Advocate Program.
          </p>
        </div>

        <div className="faq-list d-flex flex-column gap-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="faq-item px-3 py-2 border-bottom"
              style={{ transition: 'all 0.3s ease-in-out' }}
            >
              <div
                className="d-flex justify-content-between align-items-center faq-question"
                onClick={() => toggleIndex(index)}
                style={{
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
              >
                <h5 className="mb-0 fw-semibold">{faq.question}</h5>
                {openIndex === index ? (
                  <ChevronUp className="text-primary transition" />
                ) : (
                  <ChevronDown className="text-muted transition" />
                )}
              </div>

              <div
                className="faq-answer mt-2"
                style={{
                  maxHeight: openIndex === index ? '500px' : '0px',
                  opacity: openIndex === index ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease-in-out',
                }}
              >
                <p className="text-muted mt-2 mb-0">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative background blob */}
      {/* <div
        className="position-absolute bottom-0 end-0"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, #f0f8ff 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
          transform: 'translate(50%, 50%)',
        }}
      /> */}
    </section>
  );
};

export default FAQ;
