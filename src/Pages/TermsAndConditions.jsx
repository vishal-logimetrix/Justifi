import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const TermsAndConditions = () => {
  return (
    <div className="terms-conditions-page">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-2">Terms and Conditions</h1>
              <p className="lead text-muted mb-1">
                Please read these terms carefully before using our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="sticky-top" style={{top: '100px'}}>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white">
                    <h5 className="mb-0">Table of Contents</h5>
                  </div>
                  <div className="card-body p-3">
                    <ul className="nav flex-column">
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#introduction">
                          <i className="bi bi-chevron-right me-2"></i>Introduction
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#accounts">
                          <i className="bi bi-chevron-right me-2"></i>Accounts
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#services">
                          <i className="bi bi-chevron-right me-2"></i>Services
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#payments">
                          <i className="bi bi-chevron-right me-2"></i>Payments
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#content">
                          <i className="bi bi-chevron-right me-2"></i>Content
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#liability">
                          <i className="bi bi-chevron-right me-2"></i>Liability
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#termination">
                          <i className="bi bi-chevron-right me-2"></i>Termination
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-dark" href="#governing-law">
                          <i className="bi bi-chevron-right me-2"></i>Governing Law
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h6 className="mb-3">Last Updated</h6>
                    <div className="bg-primary text-white p-3 rounded">
                      <div className="fs-1 fw-bold">18</div>
                      <div>August 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-9">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4 p-md-5">
                  <div className="alert alert-warning mb-5">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                      <div>
                        <h5 className="mb-2">Important Notice</h5>
                        <p className="mb-0">
                          By accessing or using our services, you agree to be bound by these terms. If you disagree with any part of these terms, you may not access the services.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="introduction">
                    <h2 className="mb-4 pb-2 border-bottom">1. Introduction</h2>
                    <p>
                      These Terms and Conditions ("Terms") govern your use of the Justifi website and services ("Services"). These Terms constitute a legally binding agreement between you ("User") and Justtifi ("Company", "we", "us", or "our").
                    </p>
                    
                    <div className="card bg-light border-0 mt-4">
                      <div className="card-body">
                        <div className="d-flex">
                          <i className="bi bi-info-circle-fill text-primary fs-3 me-3"></i>
                          <div>
                            <h5>Key Definitions</h5>
                            <ul className="mb-0">
                              <li><strong>Services:</strong> All legal services provided through our platform</li>
                              <li><strong>Content:</strong> Any text, documents, or materials provided through our services</li>
                              <li><strong>User:</strong> Any individual or entity using our services</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="accounts">
                    <h2 className="mb-4 pb-2 border-bottom">2. User Accounts</h2>
                    <p>
                      To access certain features of our Services, you may be required to create an account.
                    </p>
                    
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-person-check text-primary me-3"></i>
                              Account Creation
                            </h5>
                            <ul className="mb-0">
                              <li>You must provide accurate information</li>
                              <li>You must be at least 18 years old</li>
                              <li>You are responsible for maintaining confidentiality</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-shield-lock text-primary me-3"></i>
                              Account Security
                            </h5>
                            <ul className="mb-0">
                              <li>You are responsible for all activities under your account</li>
                              <li>Notify us immediately of any unauthorized use</li>
                              <li>We may suspend accounts violating these Terms</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert alert-danger">
                      <p className="mb-0">
                        <i className="bi bi-exclamation-octagon-fill me-2"></i>
                        <strong>Prohibited:</strong> Creating accounts with false information, sharing accounts, or creating multiple accounts to circumvent restrictions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="services">
                    <h2 className="mb-4 pb-2 border-bottom">3. Services</h2>
                    <p>
                      Justifi provides various legal services as described on our platform:
                    </p>
                    
                    <div className="table-responsive mt-4">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Service</th>
                            <th>Description</th>
                            <th>Limitations</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Document Preparation</td>
                            <td>Custom legal document creation</td>
                            <td>Not a substitute for legal advice</td>
                          </tr>
                          <tr>
                            <td>Legal Consultation</td>
                            <td>Professional legal advice sessions</td>
                            <td>Subject to attorney availability</td>
                          </tr>
                          <tr>
                            <td>Case Tracking</td>
                            <td>Monitor legal case progress</td>
                            <td>Data depends on court records</td>
                          </tr>
                          <tr>
                            <td>Legal Research</td>
                            <td>Access to legal resources</td>
                            <td>Not exhaustive legal research</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="card border-0 bg-light mt-4">
                      <div className="card-body">
                        <h5 className="d-flex align-items-center">
                          <i className="bi bi-lightbulb text-warning me-3"></i>
                          Important Notes About Our Services
                        </h5>
                        <ul className="mb-0">
                          <li>Our services do not constitute attorney-client privilege unless explicitly stated</li>
                          <li>We are not a law firm and do not provide legal representation</li>
                          <li>Document preparation services are not a substitute for legal advice</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="payments">
                    <h2 className="mb-4 pb-2 border-bottom">4. Payments and Fees</h2>
                    <p>
                      Certain services require payment. By purchasing services, you agree to our payment terms:
                    </p>
                    
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-credit-card text-primary me-3"></i>
                              Payment Methods
                            </h5>
                            <ul className="mb-0">
                              <li>Credit/Debit Cards</li>
                              <li>PayPal</li>
                              <li>Bank Transfers</li>
                              <li>Other approved payment processors</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-cash-coin text-primary me-3"></i>
                              Fees and Charges
                            </h5>
                            <ul className="mb-0">
                              <li>Service fees are non-refundable unless stated otherwise</li>
                              <li>You are responsible for any taxes</li>
                              <li>We may change prices with 30 days notice</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert alert-info">
                      <p className="mb-0">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        For details about refunds, please see our <Link to="/refund-policy" className="text-decoration-none">Refund Policy</Link>.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="content">
                    <h2 className="mb-4 pb-2 border-bottom">5. Intellectual Property</h2>
                    <p>
                      All content provided through our Services is protected by intellectual property laws:
                    </p>
                    
                    <div className="card border-0 shadow-sm mt-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 mb-4 mb-md-0">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-file-earmark-lock text-primary me-3"></i>
                              Our Content
                            </h5>
                            <ul className="mb-0">
                              <li>All rights reserved unless otherwise stated</li>
                              <li>You may not reproduce, distribute, or create derivative works</li>
                              <li>Limited license granted for personal use</li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-upload text-primary me-3"></i>
                              Your Content
                            </h5>
                            <ul className="mb-0">
                              <li>You retain ownership of content you provide</li>
                              <li>You grant us license to use it to provide services</li>
                              <li>You are responsible for content you upload</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert alert-danger mt-4">
                      <p className="mb-0">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <strong>Prohibited Content:</strong> Illegal material, confidential information you don't own, or content violating others' rights.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="liability">
                    <h2 className="mb-4 pb-2 border-bottom">6. Limitation of Liability</h2>
                    <p>
                      To the maximum extent permitted by law:
                    </p>
                    
                    <div className="card border-0 bg-light mt-4">
                      <div className="card-body">
                        <div className="d-flex">
                          <i className="bi bi-shield-exclamation text-danger fs-3 me-3"></i>
                          <div>
                            <h5>Disclaimer</h5>
                            <p className="mb-0">
                              Our services are provided "as is" without warranties of any kind. We do not guarantee that:
                            </p>
                            <ul className="mb-0">
                              <li>The services will meet your requirements</li>
                              <li>The services will be uninterrupted or error-free</li>
                              <li>The results obtained will be accurate or reliable</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card border-0 bg-light mt-4">
                      <div className="card-body">
                        <div className="d-flex">
                          <i className="bi bi-cash-stack text-danger fs-3 me-3"></i>
                          <div>
                            <h5>Liability Cap</h5>
                            <p className="mb-0">
                              Our total liability for any claims related to these Terms or our Services shall not exceed the amount you paid us for the services in the past 12 months.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="termination">
                    <h2 className="mb-4 pb-2 border-bottom">7. Termination</h2>
                    <p>
                      We may terminate or suspend your account and access to Services immediately, without prior notice or liability:
                    </p>
                    
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-person-x text-danger me-3"></i>
                              By Us
                            </h5>
                            <ul className="mb-0">
                              <li>For breach of these Terms</li>
                              <li>For unlawful use of Services</li>
                              <li>For fraudulent activities</li>
                              <li>At our sole discretion</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-door-open text-danger me-3"></i>
                              By You
                            </h5>
                            <ul className="mb-0">
                              <li>Stop using our Services</li>
                              <li>Delete your account</li>
                              <li>Cancel any subscriptions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert alert-warning mt-3">
                      <h5 className="d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        Effects of Termination
                      </h5>
                      <ul className="mb-0">
                        <li>Your right to use Services will immediately cease</li>
                        <li>We may delete your account information</li>
                        <li>Outstanding payments remain due</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div id="governing-law">
                    <h2 className="mb-4 pb-2 border-bottom">8. Governing Law</h2>
                    <p>
                      These Terms shall be governed and construed in accordance with the laws of the State of Maharashtra, India, without regard to its conflict of law provisions.
                    </p>
                    
                    <div className="card border-0 shadow-sm mt-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 mb-4 mb-md-0">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-building text-primary me-3"></i>
                              Jurisdiction
                            </h5>
                            <p className="mb-0">
                              Any disputes shall be resolved in the state or federal courts located in Mumbai, Maharashtra
                            </p>
                          </div>
                          <div className="col-md-6">
                            <h5 className="d-flex align-items-center">
                              <i className="bi bi-globe text-primary me-3"></i>
                              International Users
                            </h5>
                            <p className="mb-0">
                              Our Services are controlled from our offices in the India. We make no claims about appropriateness outside the India.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert alert-info mt-4">
                      <p className="mb-0">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in effect.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-5" id="contact">
                    <h2 className="mb-4 pb-2 border-bottom">Contact Information</h2>
                    <p>
                      For any questions about these Terms, please contact us:
                    </p>
                    
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center mb-4">
                              <i className="bi bi-envelope me-3 text-primary"></i>
                              By Email
                            </h5>
                            <p className="mb-0">
                              <a href="mailto:partners@justifi.in" className="text-decoration-none">
                                partners@justifi.in
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center mb-4">
                              <i className="bi bi-geo-alt me-3 text-primary"></i>
                              By Mail
                            </h5>
                            <address className="mb-0">
                             RH 8, Om Dwarkanath CHS, <br />
                          Plot #11, Sector 19A, <br />
                          Nerul East, Navi Mumbai, <br />
                           Maharashtra - India - 400 706
                            </address>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style >{`
        .terms-conditions-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .nav-tabs-custom .nav-link {
          padding: 1rem 1.5rem;
          font-weight: 500;
          border: none;
          border-bottom: 3px solid transparent;
          color: #6c757d;
        }
        
        .nav-tabs-custom .nav-link.active {
          color: #0d6efd;
          background: transparent;
          border-bottom: 3px solid #0d6efd;
        }
        
        .nav-tabs-custom .nav-link i {
          margin-right: 8px;
        }
        
        @media (max-width: 991px) {
          .step-process {
            padding-left: 30px;
          }
          
          .step-number {
            left: -30px;
          }
        }
        
        @media (max-width: 767px) {
          .step-process {
            padding-left: 25px;
          }
          
          .step-number {
            width: 25px;
            height: 25px;
            left: -25px;
          }
        }
      `}</style>
      
    </div>
  );
};

export default TermsAndConditions;