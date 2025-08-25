import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPage = () => {
  return (
    <div className="privacy-policy-page py-5">
      
      <Header />

      {/* Hero Section */}
      <section className="bg-light py-2">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-2">Privacy Policy</h1>
              <p className="lead text-muted mb-2">
                We are committed to protecting your personal information and your right to privacy.
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
                        <a className="nav-link text-dark" href="#data-collection">
                          <i className="bi bi-chevron-right me-2"></i>Data Collection
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#data-use">
                          <i className="bi bi-chevron-right me-2"></i>Use of Information
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#data-sharing">
                          <i className="bi bi-chevron-right me-2"></i>Data Sharing
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#security">
                          <i className="bi bi-chevron-right me-2"></i>Security
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#cookies">
                          <i className="bi bi-chevron-right me-2"></i>Cookies
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#rights">
                          <i className="bi bi-chevron-right me-2"></i>Your Rights
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-dark" href="#contact">
                          <i className="bi bi-chevron-right me-2"></i>Contact Us
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
                  <div className="mb-5" id="introduction">
                <h2 className="mb-4 pb-2 border-bottom">1. Introduction</h2>
                <p>
                  At Justifi, we take your privacy seriously. This Privacy Policy describes how we collect, 
                  use, and disclose your personal information when you visit our website or use our services.
                </p>
                <p>
                  By accessing or using our services, you agree to the collection and use of information in 
                  accordance with this policy.
                </p>
              </div>
              
              <div className="mb-5" id="data-collection">
                <h2 className="mb-4 pb-2 border-bottom">2. Information We Collect</h2>
                <p>We collect several different types of information for various purposes:</p>
                
                <div className="mb-4">
                  <h5 className="mb-3">
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    Personal Information
                  </h5>
                  <p>
                    When you register for an account, we may ask for your contact information, including 
                    items such as name, company name, address, email address, and telephone number.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h5 className="mb-3">
                    <i className="bi bi-credit-card me-2 text-primary"></i>
                    Payment Information
                  </h5>
                  <p>
                    If you make purchases through our services, we collect payment information such as 
                    credit card numbers and billing addresses.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h5 className="mb-3">
                    <i className="bi bi-laptop me-2 text-primary"></i>
                    Usage Data
                  </h5>
                  <p>
                    We automatically collect information on how you interact with our services, including 
                    IP address, browser type, pages visited, and other diagnostic data.
                  </p>
                </div>
              </div>
              
              <div className="mb-5" id="data-use">
                <h2 className="mb-4 pb-2 border-bottom">3. How We Use Your Information</h2>
                <p>We use the collected information for various purposes:</p>
                
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item d-flex border-0 px-0">
                    <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                    <span>To provide and maintain our services</span>
                  </li>
                  <li className="list-group-item d-flex border-0 px-0">
                    <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                    <span>To process your transactions</span>
                  </li>
                  <li className="list-group-item d-flex border-0 px-0">
                    <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                    <span>To notify you about changes to our services</span>
                  </li>
                  <li className="list-group-item d-flex border-0 px-0">
                    <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                    <span>To provide customer support</span>
                  </li>
                  <li className="list-group-item d-flex border-0 px-0">
                    <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                    <span>To improve our services</span>
                  </li>
                  <li className="list-group-item d-flex border-0 px-0">
                    <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                    <span>To monitor the usage of our services</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-5" id="data-sharing">
                <h2 className="mb-4 pb-2 border-bottom">4. Sharing Your Information</h2>
                <p>
                  We may share your personal information in the following situations:
                </p>
                
                <div className="card border-0 bg-light mb-4">
                  <div className="card-body">
                    <div className="d-flex">
                      <i className="bi bi-building text-primary fs-3 me-3"></i>
                      <div>
                        <h5>With Service Providers</h5>
                        <p className="mb-0">
                          We may share your information with service providers to monitor and analyze the 
                          use of our service, to process payments, etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card border-0 bg-light mb-4">
                  <div className="card-body">
                    <div className="d-flex">
                      <i className="bi bi-shuffle text-primary fs-3 me-3"></i>
                      <div>
                        <h5>For Business Transfers</h5>
                        <p className="mb-0">
                          We may share or transfer your information in connection with, or during negotiations 
                          of, any merger, sale of company assets, financing, or acquisition.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <div className="d-flex">
                      <i className="bi bi-shield-lock text-primary fs-3 me-3"></i>
                      <div>
                        <h5>With Law Enforcement</h5>
                        <p className="mb-0">
                          We may disclose your information where required to do so by law or in response 
                          to valid requests by public authorities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-5" id="security">
                <h2 className="mb-4 pb-2 border-bottom">5. Security of Your Information</h2>
                <p>
                  We use administrative, technical, and physical security measures to help protect your 
                  personal information. While we have taken reasonable steps to secure the personal 
                  information you provide to us, please be aware that despite our efforts, no security 
                  measures are perfect or impenetrable.
                </p>
                
                <div className="row mt-4">
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center p-4">
                        <i className="bi bi-lock-fill text-primary fs-1 mb-3"></i>
                        <h5>Data Encryption</h5>
                        <p className="mb-0">
                          We use industry-standard encryption to protect your data in transit and at rest.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center p-4">
                        <i className="bi bi-shield-check text-primary fs-1 mb-3"></i>
                        <h5>Access Controls</h5>
                        <p className="mb-0">
                          Strict access controls limit who can view or modify your personal information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-5" id="cookies">
                <h2 className="mb-4 pb-2 border-bottom">6. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our service and 
                  store certain information.
                </p>
                
                <div className="alert alert-info d-flex align-items-center">
                  <i className="bi bi-info-circle-fill fs-4 me-3"></i>
                  <div>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is 
                    being sent. However, if you do not accept cookies, you may not be able to use some 
                    portions of our service.
                  </div>
                </div>
                
                <div className="table-responsive mt-4">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Purpose</th>
                        <th>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Essential Cookies</td>
                        <td>Necessary for the website to function</td>
                        <td>Session cookies</td>
                      </tr>
                      <tr>
                        <td>Analytics Cookies</td>
                        <td>Help us understand how visitors use our site</td>
                        <td>Google Analytics</td>
                      </tr>
                      <tr>
                        <td>Preference Cookies</td>
                        <td>Remember your preferences</td>
                        <td>Language settings</td>
                      </tr>
                      <tr>
                        <td>Advertising Cookies</td>
                        <td>Deliver personalized advertisements</td>
                        <td>Facebook Pixel</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-5" id="rights">
                <h2 className="mb-4 pb-2 border-bottom">7. Your Privacy Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                
                <div className="row mt-4">
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item d-flex border-0 px-0">
                        <i className="bi bi-eye-fill text-primary me-2 mt-1"></i>
                        <span>The right to access your information</span>
                      </li>
                      <li className="list-group-item d-flex border-0 px-0">
                        <i className="bi bi-pencil-square text-primary me-2 mt-1"></i>
                        <span>The right to rectify inaccurate information</span>
                      </li>
                      <li className="list-group-item d-flex border-0 px-0">
                        <i className="bi bi-trash-fill text-primary me-2 mt-1"></i>
                        <span>The right to request deletion of your data</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex border-0 px-0">
                        <i className="bi bi-x-circle-fill text-primary me-2 mt-1"></i>
                        <span>The right to object to processing</span>
                      </li>
                      <li className="list-group-item d-flex border-0 px-0">
                        <i className="bi bi-file-earmark-arrow-down text-primary me-2 mt-1"></i>
                        <span>The right to data portability</span>
                      </li>
                      <li className="list-group-item d-flex border-0 px-0">
                        <i className="bi bi-sliders text-primary me-2 mt-1"></i>
                        <span>The right to withdraw consent</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="alert alert-warning mt-4">
                  <p className="mb-0">
                    To exercise any of these rights, please contact us using the information provided below.
                  </p>
                </div>
              </div>
              
              <div id="contact">
                <h2 className="mb-4 pb-2 border-bottom">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, you can contact us:
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
                          <a href="mailto:privacy@legalease.com" className="text-decoration-none">
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
                
                <div className="card border-0 bg-light">
                  <div className="card-body p-4">
                    <h5 className="d-flex align-items-center mb-4">
                      <i className="bi bi-people me-3 text-primary"></i>
                      Data Protection Officer
                    </h5>
                    <p className="mb-0">
                      Our Data Protection Officer can be reached at:
                      <br />
                      <a href="mailto:dpo@legalease.com" className="text-decoration-none">
                        partners@justifi.in
                      </a>
                    </p>
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

    </div>
  );
};

export default PrivacyPage;