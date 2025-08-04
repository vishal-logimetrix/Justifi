import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Calendar,
  Phone,
  MapPin,
  Landmark,
  Hash,
  Building2,
  Locate,
  Briefcase,
  Mail,
  Lock,
  Building,
  ArrowLeft,
  BadgeInfo
} from 'lucide-react';
import { toast } from 'react-toastify';
// import userRegisterApi from '../../api/userRegisterApi';
import Header from "../components/Header";
import Footer from '../components/Footer';
import userRegisterApi from '../api/userRegisterApi';

const UserRegister = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('personal');
  const [loading, setLoading] = useState(false);

  const initialForm = {
    account_type: 'personal',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile_no: '',
    alternate_mobile_no: '',
    dob: '',
    address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    firm_name: '',
    gstin: '',
    contact_email: '',
    contact_number: '',
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setForm((prev) => ({
      ...initialForm,
      account_type: type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await userRegisterApi.post(`users/register/user`, form);
      toast.success('Registration successful');
      setForm({ ...initialForm, account_type: accountType });
      navigate('/login');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, name, icon, type = 'text', placeholder = '') => (
    <div className="col-md-6 mb-3">
      <label className="form-label fw-medium text-muted">{label}</label>
      <div className="input-group">
        <span className="input-group-text bg-light border-end-0">
          {React.cloneElement(icon, { size: 18, className: 'text-primary' })}
        </span>
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="form-control border-start-0"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-vh-100 bg-light py-5 mt-5 ">
        <div className="container py-6 py-md-8">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 pt-2">
                  <button 
                    onClick={() => navigate(-1)} 
                    className="btn btn-outline-primary btn-sm mb-3 d-flex align-items-center"
                  >
                    <ArrowLeft size={18} className="me-1" /> Back
                  </button>
                  <h2 className="fw-bold text-center mb-1">Create Your Account</h2>
                  <p className="text-muted text-center mb-4">
                    Join our legal network as a {accountType === 'personal' ? 'individual user' : 'business entity'}
                  </p>
                  
                  {/* Account Type Switcher */}
                  <div className="d-flex justify-content-center mb-4">
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className={`btn ${accountType === 'personal' ? 'btn-primary' : 'btn-outline-primary'} px-4 py-2`}
                        onClick={() => handleAccountTypeChange('personal')}
                      >
                        <User size={18} className="me-2" />
                        Personal Account
                      </button>
                      <button
                        type="button"
                        className={`btn ${accountType === 'business' ? 'btn-primary' : 'btn-outline-primary'} px-4 py-2`}
                        onClick={() => handleAccountTypeChange('business')}
                      >
                        <Briefcase size={18} className="me-2" />
                        Business Account
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body px-5 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/* Common Fields */}
                      {renderInput('First Name', 'first_name', <User />, 'text', 'John')}
                      {renderInput('Last Name', 'last_name', <User />, 'text', 'Doe')}
                      {renderInput('Email Address', 'email', <Mail />, 'email', 'john@example.com')}
                      {renderInput('Password', 'password', <Lock />, 'password', '••••••••')}
                      {renderInput('Mobile Number', 'mobile_no', <Phone />, 'tel', '9876543210')}
                      {renderInput('Alternate Mobile', 'alternate_mobile_no', <Phone />, 'tel', '9123456780')}
                      {renderInput('Date of Birth', 'dob', <Calendar />, 'date')}
                      {renderInput('Address', 'address', <MapPin />, 'text', '123 Main Street')}
                      {renderInput('Landmark', 'landmark', <Landmark />, 'text', 'Near Central Park')}
                      {renderInput('Pincode', 'pincode', <Hash />, 'text', '400001')}
                      {renderInput('City', 'city', <Building2 />, 'text', 'Mumbai')}
                      {renderInput('State', 'state', <Locate />, 'text', 'Maharashtra')}

                      {/* Business Specific Fields */}
                      {accountType === 'business' && (
                        <>
                          {renderInput('Firm Name', 'firm_name', <Building />, 'text', 'Legal Associates LLP')}
                          {renderInput('GSTIN Number', 'gstin', <BadgeInfo />, 'text', '29ABCDE1234F1Z5')}
                          {renderInput('Contact Email', 'contact_email', <Mail />, 'email', 'contact@firm.com')}
                          {renderInput('Contact Number', 'contact_number', <Phone />, 'tel', '18001234567')}
                        </>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-top">
                      <div className="form-check mb-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="termsCheck"
                          required
                        />
                        <label className="form-check-label text-muted" htmlFor="termsCheck">
                          I agree to the <a href="/terms" className="text-primary">Terms of Service</a> and <a href="/privacy" className="text-primary">Privacy Policy</a>
                        </label>
                      </div>

                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg fw-bold py-3"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Registering...
                            </>
                          ) : (
                            'Complete Registration'
                          )}
                        </button>
                      </div>

                      <div className="text-center mt-4">
                        <p className="text-muted">
                          Already have an account?{' '}
                          <a href="/login" className="text-primary fw-medium">
                            Sign in here
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <Footer />
    </>
  );
};

export default UserRegister;