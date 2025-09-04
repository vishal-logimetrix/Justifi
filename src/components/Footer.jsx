import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Scale } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        
        <div className="row g-4">
          
          {/* Brand & Description */}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-3">
              {/* <div className="bg-primary p-2 rounded-circle me-2">
                <Scale size={24} className="text-white" />
              </div> */}
              <h5 className="fw-bold mb-0">JUSTIFI</h5>
            </div>
            <p className="small">
              JUSTIFI is India’s fastest-growing legal platform, connecting advocates with clients nationwide for efficient, transparent, and reliable legal services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/ask-query" className="text-white text-decoration-none">Ask a Query</Link></li>
              {/* <li><Link to="/for-advocates" className="text-white text-decoration-none">For Advocates</Link></li> */}
              <li><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
              <li><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3">Contact</h6>
            <ul className="list-unstyled small">
              <li className="mb-2 d-flex align-items-center">
                <Mail size={16} className="me-2" />
                partners@justifi.in
              </li>
              <li className="mb-2 d-flex align-items-center">
                <Phone size={16} className="me-2" />
                +91-8000000000
              </li>
              <li className="d-flex align-items-center">
                <MapPin size={16} className="me-2 flex-shrink-0" />
                RH 8, Om Dwarkanath CHS, Plot #11, Sector 19A, Nerul East, Navi Mumbai, Maharashtra - India - 400 706s
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-white fs-5"><Facebook /></a>
              <a href="#" className="text-white fs-5"><Twitter /></a>
              <a href="#" className="text-white fs-5"><Linkedin /></a>
            </div>
            {/* <ul className='list-unstyled small'>
              <li>Privacy policy</li>
              <li>Refund policy</li>
              <li>Terms and conditions</li>
            </ul> */}
          </div>

          {/* Terms and conditions */}
          <div className="col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3">Terms</h6>
            <ul className='list-unstyled small'>
              <li>
                <Link to="/privacy-policy" className="text-white text-decoration-none">Privacy policy</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-white text-decoration-none">Refund policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-white text-decoration-none">Terms and conditions</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-top border-secondary mt-4 pt-3 text-center small">
          &copy; {new Date().getFullYear()} JUSTIFI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
