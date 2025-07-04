import React, { useState } from 'react';
import { User, Calendar, Phone, MapPin, Landmark, Hash, Building2, Locate } from 'lucide-react';
import { toast } from 'react-toastify';
import { postRequest } from '../../api/httpService';


const UserRegister = () => {
  const [form, setForm] = useState({
    role: 'user',
    fullName: '',
    dob: '',
    phone: '',
    alternatePhone: '',
    address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postRequest('/users/register', form);
      toast.success('User registered successfully');
      console.log('Response:', res);
      // Optionally reset form
      setForm({
        role: 'user',
        fullName: '',
        dob: '',
        phone: '',
        alternatePhone: '',
        address: '',
        landmark: '',
        pincode: '',
        city: '',
        state: '',
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      {/* Full Name */}
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <div className="input-group">
          <span className="input-group-text">
            <User size={18} />
          </span>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <div className="input-group">
          <span className="input-group-text">
            <Calendar size={18} />
          </span>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <div className="input-group">
          <span className="input-group-text">
            <Phone size={18} />
          </span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>

      {/* Alternate Phone */}
      <div className="mb-3">
        <label className="form-label">Alternate Number</label>
        <div className="input-group">
          <span className="input-group-text">
            <Phone size={18} />
          </span>
          <input
            type="tel"
            name="alternatePhone"
            value={form.alternatePhone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter alternate number"
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-3">
        <label className="form-label">Address</label>
        <div className="input-group">
          <span className="input-group-text">
            <MapPin size={18} />
          </span>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your address"
            required
          />
        </div>
      </div>

      {/* Landmark */}
      <div className="mb-3">
        <label className="form-label">Landmark</label>
        <div className="input-group">
          <span className="input-group-text">
            <Landmark size={18} />
          </span>
          <input
            type="text"
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            className="form-control"
            placeholder="Nearby landmark"
          />
        </div>
      </div>

      {/* Pincode */}
      <div className="mb-3">
        <label className="form-label">Pincode</label>
        <div className="input-group">
          <span className="input-group-text">
            <Hash size={18} />
          </span>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter pincode"
            required
          />
        </div>
      </div>

      {/* City */}
      <div className="mb-3">
        <label className="form-label">City</label>
        <div className="input-group">
          <span className="input-group-text">
            <Building2 size={18} />
          </span>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter city"
            required
          />
        </div>
      </div>

      {/* State */}
      <div className="mb-4">
        <label className="form-label">State</label>
        <div className="input-group">
          <span className="input-group-text">
            <Locate size={18} />
          </span>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter state"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary px-4 py-2 fw-bold"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Register Now'}
        </button>
      </div>
    </form>
  );
};

export default UserRegister;
