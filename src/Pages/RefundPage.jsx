import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RefundPage = () => {
  return (
    <div className="refund-policy-page py-5">
      {/* Header */}
       <Header />

      {/* Hero Section */}
      <section className="bg-light py-2">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-2">Refund Policy</h1>
              <p className="lead text-muted mb-2">
                Our commitment to fair and transparent refund practices for all our services.
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
                        <a className="nav-link text-dark" href="#overview">
                          <i className="bi bi-chevron-right me-2"></i>Policy Overview
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#eligibility">
                          <i className="bi bi-chevron-right me-2"></i>Eligibility
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#process">
                          <i className="bi bi-chevron-right me-2"></i>Refund Process
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#timeline">
                          <i className="bi bi-chevron-right me-2"></i>Timeline
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#exceptions">
                          <i className="bi bi-chevron-right me-2"></i>Exceptions
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a className="nav-link text-dark" href="#non-refundable">
                          <i className="bi bi-chevron-right me-2"></i>Non-Refundable Services
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
                  <div className="alert alert-info d-flex align-items-center">
                    <i className="bi bi-info-circle-fill fs-4 me-3"></i>
                    <div>
                      This policy outlines our refund practices. Please read it carefully before requesting a refund.
                    </div>
                  </div>
                  
                  <div className="mb-5" id="overview">
                    <h2 className="mb-4 pb-2 border-bottom">1. Policy Overview</h2>
                    <p>
                      At Justifi, we strive to provide exceptional service to all our clients. However, we understand that 
                      circumstances may arise where you need to request a refund. This policy outlines the conditions under 
                      which refunds may be granted for our services.
                    </p>
                    <p>
                      This refund policy applies to all services purchased through Justifi. By using our services, you 
                      agree to the terms of this refund policy.
                    </p>
                    
                    <div className="card bg-light border-0 mt-4">
                      <div className="card-body">
                        <div className="d-flex">
                          <i className="bi bi-arrow-repeat text-primary fs-3 me-3"></i>
                          <div>
                            <h5>Key Principles</h5>
                            <ul className="mb-0">
                              <li>Refunds are processed within 7-14 business days</li>
                              <li>Full refunds available within 14 days for eligible services</li>
                              <li>Partial refunds available under certain conditions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="eligibility">
                    <h2 className="mb-4 pb-2 border-bottom">2. Eligibility for Refunds</h2>
                    <p>
                      To be eligible for a refund, your request must meet the following criteria:
                    </p>
                    
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4 text-center">
                            <div className="icon-lg bg-success text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center">
                              <i className="bi bi-check2-circle fs-2"></i>
                            </div>
                            <h5>Full Refunds</h5>
                            <p className="mb-0">
                              Available within 14 days of purchase if services haven't been initiated
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4 text-center">
                            <div className="icon-lg bg-warning text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center">
                              <i className="bi bi-percent fs-2"></i>
                            </div>
                            <h5>Partial Refunds</h5>
                            <p className="mb-0">
                              Available if services were partially completed or unsatisfactory
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert alert-warning mt-3">
                      <h5 className="d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        Important Considerations
                      </h5>
                      <ul className="mb-0">
                        <li>Refund requests must be submitted within 30 days of purchase</li>
                        <li>Documentation may be required to support your request</li>
                        <li>Refunds are issued to the original payment method</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="process">
                    <h2 className="mb-4 pb-2 border-bottom">3. Refund Process</h2>
                    <p>
                      To request a refund, please follow these steps:
                    </p>
                    
                    <div className="step-process mt-4">
                      <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h5>Submit Request</h5>
                          <p>
                            Contact our support team at partners@justifi.in with your order details and reason for refund.
                          </p>
                        </div>
                      </div>
                      
                      <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h5>Review Process</h5>
                          <p>
                            Our team will review your request within 3-5 business days. We may contact you for additional information.
                          </p>
                        </div>
                      </div>
                      
                      <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h5>Decision Notification</h5>
                          <p>
                            You'll receive an email notification regarding the approval or denial of your refund request.
                          </p>
                        </div>
                      </div>
                      
                      <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                          <h5>Refund Processing</h5>
                          <p>
                            Approved refunds will be processed within 7-14 business days to your original payment method.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card bg-light border-0 mt-4">
                      <div className="card-body">
                        <h5 className="d-flex align-items-center">
                          <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                          Tips for Faster Processing
                        </h5>
                        <ul className="mb-0">
                          <li>Include your order number in all communications</li>
                          <li>Provide detailed reason for your refund request</li>
                          <li>Attach any supporting documentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="timeline">
                    <h2 className="mb-4 pb-2 border-bottom">4. Refund Timeline</h2>
                    <p>
                      The refund process timeline varies depending on your payment method and financial institution:
                    </p>
                    
                    <div className="table-responsive mt-4">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Payment Method</th>
                            <th>Processing Time</th>
                            <th>Time to Appear in Account</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Credit/Debit Card</td>
                            <td>3-5 business days</td>
                            <td>5-10 business days</td>
                          </tr>
                          <tr>
                            <td>PayPal</td>
                            <td>24-48 hours</td>
                            <td>3-5 business days</td>
                          </tr>
                          <tr>
                            <td>Bank Transfer</td>
                            <td>5-7 business days</td>
                            <td>7-14 business days</td>
                          </tr>
                          <tr>
                            <td>E-Wallets</td>
                            <td>1-3 business days</td>
                            <td>2-5 business days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="alert alert-info mt-4">
                      <p className="mb-0">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        Note: The time it takes for the refund to appear in your account may vary depending on your financial institution.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="exceptions">
                    <h2 className="mb-4 pb-2 border-bottom">5. Exceptions to Refund Policy</h2>
                    <p>
                      In certain situations, we may make exceptions to our standard refund policy:
                    </p>
                    
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-calendar-x text-danger fs-3 me-3"></i>
                              <div>
                                <h5>Service Cancellation</h5>
                                <p className="mb-0">
                                  If we cancel a service before delivery, you'll receive a full refund automatically.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-bug text-danger fs-3 me-3"></i>
                              <div>
                                <h5>Technical Issues</h5>
                                <p className="mb-0">
                                  If service was unusable due to technical errors on our part, you may qualify for a full refund.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-file-earmark-text text-danger fs-3 me-3"></i>
                              <div>
                                <h5>Document Errors</h5>
                                <p className="mb-0">
                                  If we make substantive errors in legal documents, you may qualify for a partial or full refund.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-clock-history text-danger fs-3 me-3"></i>
                              <div>
                                <h5>Delayed Services</h5>
                                <p className="mb-0">
                                  If services are significantly delayed beyond agreed timelines, you may qualify for a partial refund.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-5" id="non-refundable">
                    <h2 className="mb-4 pb-2 border-bottom">6. Non-Refundable Services</h2>
                    <p>
                      The following services and situations are not eligible for refunds:
                    </p>
                    
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-body">
                        <ul className="mb-0">
                          <li>Services that have been fully completed to satisfaction</li>
                          <li>Digital products that have been downloaded or accessed</li>
                          <li>Custom legal documents that have been delivered</li>
                          <li>Services purchased more than 30 days ago</li>
                          <li>Consultation fees for completed sessions</li>
                          <li>Services rendered in violation of our terms of service</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="alert alert-warning">
                      <p className="mb-0">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        Please carefully review service descriptions before purchasing. We do not provide refunds for change of mind or failure to understand service details.
                      </p>
                    </div>
                  </div>
                  
                  <div id="contact">
                    <h2 className="mb-4 pb-2 border-bottom">7. Contact Us</h2>
                    <p>
                      For any questions about our refund policy or to initiate a refund request:
                    </p>
                    
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center mb-4">
                              <i className="bi bi-envelope me-3 text-primary"></i>
                              Refund Requests
                            </h5>
                            <p className="mb-0">
                              <a href="mailto:partners@justifi.in" className="text-decoration-none d-block mb-2">
                                partners@justifi.in
                              </a>
                              <span className="text-muted">Include your order number in all communications</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="d-flex align-items-center mb-4">
                              <i className="bi bi-telephone me-3 text-primary"></i>
                              Customer Support
                            </h5>
                            <p className="mb-0">
                              <a href="tel:+18005551234" className="text-decoration-none d-block mb-1">
                                +1 (800) 555-1234
                              </a>
                              <span className="text-muted d-block">Monday-Friday: 9am-6pm IST</span>
                              <span className="text-muted">Saturday: 10am-2pm IST</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card border-0 bg-light">
                      <div className="card-body p-4">
                        <h5 className="d-flex align-items-center mb-4">
                          <i className="bi bi-chat-dots me-3 text-primary"></i>
                          Live Chat Support
                        </h5>
                        <p className="mb-0">
                          Visit our <a href="#" className="text-decoration-none">support page</a> to chat with a representative during business hours.
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

      <style>{`
        .refund-policy-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .step-process {
          position: relative;
          padding-left: 40px;
        }
        
        .step {
          position: relative;
          margin-bottom: 30px;
        }
        
        .step-number {
          position: absolute;
          left: -40px;
          top: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #0d6efd;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .step-content {
          padding: 15px 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 3px solid #0d6efd;
        }
        
        .icon-lg {
          width: 70px;
          height: 70px;
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

export default RefundPage;