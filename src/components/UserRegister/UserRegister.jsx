import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { toast } from 'react-toastify';
import userRegisterApi from '../../api/userRegisterApi';
// import axios from 'axios';
// axios.defaults.baseURL = import.meta.env.VITE_API_URL_USER;


const UserRegister = () => {
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

  useEffect(()=>{
    
  }, [])
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
      console.log("----",form)
      const res = await userRegisterApi.post(`users/register/user`, form);
      toast.success('User registered successfully');
      console.log('Response:', res);
      setForm({ ...initialForm, account_type: accountType });
    } catch (error) {
      // toast.error(
      //   error?.response?.data?.message || 'Registration failed. Please try again.'
      // );
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, name, icon, type = 'text', placeholder = '') => (
    <div className="col-md-6">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">{icon}</span>
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="form-control"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      {/* <h3 className="mb-4">User Registration</h3> */}

      {/* Account Type Switcher */}
      <div className="mb-4 d-flex gap-3 d-flex justify-content-center">
        <button
          type="button"
          className={`btn ${accountType === 'personal' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleAccountTypeChange('personal')}
        >
          Personal Use
        </button>
        <button
          type="button"
          className={`btn ${accountType === 'business' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleAccountTypeChange('business')}
        >
          Business Use
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {renderInput('First Name', 'first_name', <User size={18} />, 'text', 'Rohit')}
          {renderInput('Last Name', 'last_name', <User size={18} />, 'text', 'Sharma')}
          {renderInput('Email', 'email', <Mail size={18} />, 'email', 'example@domain.com')}
          {renderInput('Password', 'password', <Lock size={18} />, 'password', '********')}
          {renderInput('Mobile Number', 'mobile_no', <Phone size={18} />, 'tel', '9876543210')}
          {renderInput('Alternate Mobile', 'alternate_mobile_no', <Phone size={18} />, 'tel', '9123456780')}
          {renderInput('Date of Birth', 'dob', <Calendar size={18} />, 'date')}
          {renderInput('Address', 'address', <MapPin size={18} />, 'text', 'B/102, Lotus Residency')}
          {renderInput('Landmark', 'landmark', <Landmark size={18} />, 'text', 'Near City Mall')}
          {renderInput('Pincode', 'pincode', <Hash size={18} />, 'text', '400001')}
          {renderInput('City', 'city', <Building2 size={18} />, 'text', 'Mumbai')}
          {renderInput('State', 'state', <Locate size={18} />, 'text', 'Maharashtra')}

          {accountType === 'business' && (
            <>
              {renderInput('Firm Name', 'firm_name', <Building size={18} />, 'text', 'Justify Legal Associates')}
              {renderInput('GSTIN', 'gstin', <Hash size={18} />, 'text', '29ABCDE1234F1Z5')}
              {renderInput('Contact Email', 'contact_email', <Mail size={18} />, 'email', 'support@justifycorp.com')}
              {renderInput('Contact Number', 'contact_number', <Phone size={18} />, 'tel', '18001234567')}
            </>
          )}
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5 py-2 fw-bold" disabled={loading}>
            {loading ? 'Registering...' : 'Register Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
