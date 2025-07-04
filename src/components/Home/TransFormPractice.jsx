
import { Mail, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const TransFormPractice = () => {
  return (
    <section
      id="registration"
      className="position-relative text-white py-5"
      style={{
        background: 'linear-gradient(135deg, #004AAD, #007BFF)',
        overflow: 'hidden',
      }}
    >
      <div className="container text-center position-relative z-2">
        <h2 className="display-5 fw-bold mb-3">Ready to Transform Your Practice?</h2>
        <p className="lead mb-4 text-white-50">
          Join the Justifi Partner Advocate Program and be part of India's legal tech revolution.
        </p>

        <Link
          to="/register"
          className="btn btn-light btn-lg fw-semibold px-4 py-2 rounded-pill shadow-sm"
        >
          Register Now
        </Link>

        <p className="mt-4 fs-5">
          Have questions? Reach us at{' '}
          <a href="mailto:partners@justifi.in" className="text-white text-decoration-underline">
            <Mail size={16} className="me-1" />
            partners@justifi.in
          </a>{' '}
          or call{' '}
          <a href="tel:+918000000000" className="text-white text-decoration-underline">
            <PhoneCall size={16} className="me-1" />
            +91-8000000000
          </a>
        </p>
      </div>

      {/* Decorative blob in background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 z-1"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.05), transparent 60%)',
        }}
      />
    </section>
  );
};

export default TransFormPractice;
