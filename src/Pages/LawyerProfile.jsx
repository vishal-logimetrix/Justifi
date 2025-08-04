import React, { useState } from "react";
import { Edit, Star, StarOff, Briefcase, GraduationCap, Globe, Phone, Mail, MapPin } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';


const LawyerProfile = () => {
  const [profile, setProfile] = useState({
    name: "Robert Johnson",
    title: "Senior Corporate Lawyer",
    email: "robert.johnson@lawfirm.com",
    phone: "+1 (555) 123-4567",
    address: "123 Legal Avenue, Suite 500, New York, NY 10001",
    bio: "Specialized in corporate law with 12+ years of experience. Proven track record in M&A, corporate restructuring, and compliance matters. Committed to providing strategic solutions to complex business challenges.",
    experience: [
      {
        id: 1,
        position: "Partner",
        company: "Smith & Partners LLP",
        duration: "2018 - Present",
      },
      {
        id: 2,
        position: "Senior Associate",
        company: "Global Law Group",
        duration: "2014 - 2018",
      },
      {
        id: 3,
        position: "Associate",
        company: "Metropolitan Legal",
        duration: "2010 - 2014",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Juris Doctor (JD)",
        institution: "Harvard Law School",
        year: "2009",
      },
      {
        id: 2,
        degree: "Bachelor of Laws (LLB)",
        institution: "Yale University",
        year: "2006",
      },
    ],
    specialties: [
      "Corporate Law",
      "Mergers & Acquisitions",
      "Contract Negotiation",
      "Compliance",
    ],
    languages: ["English", "Spanish", "French"],
    ratings: {
      average: 4.7,
      total: 128,
      breakdown: [5, 4, 3, 2, 1], // counts for each star rating
    },
    reviews: [
      {
        id: 1,
        client: "Sarah Thompson",
        rating: 5,
        date: "2025-06-15",
        comment:
          "Robert provided exceptional guidance during our company acquisition. His attention to detail and strategic approach saved us millions.",
      },
      {
        id: 2,
        client: "Michael Chen",
        rating: 4,
        date: "2025-05-22",
        comment:
          "Professional and responsive. Helped us navigate complex compliance issues efficiently.",
      },
      {
        id: 3,
        client: "Emily Rodriguez",
        rating: 5,
        date: "2025-04-10",
        comment:
          "Handled our international contract negotiations brilliantly. Would highly recommend for corporate matters.",
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState("overview");

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <Star key={i} className="text-warning" />
      ) : (
        <StarOff key={i} className="text-muted" />
      )
    );
  };

  return (
    <div className="container py-5">
      {/* Edit Profile Modal */}
      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="dense"
            value={editData.name}
            onChange={handleEditChange}
          />
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="dense"
            value={editData.title}
            onChange={handleEditChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="dense"
            value={editData.email}
            onChange={handleEditChange}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            margin="dense"
            value={editData.phone}
            onChange={handleEditChange}
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            margin="dense"
            value={editData.address}
            onChange={handleEditChange}
          />
          <TextField
            label="Bio"
            name="bio"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={editData.bio}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsEditing(false)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <div className="row">
        {/* Profile Header */}
        <div className="col-12">
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="position-relative">
                  {/* <div className="avatar avatar-xxl bg-primary text-white rounded-circle">
                    {profile.name.charAt(0)}
                  </div> */}
                  <button
                    className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0"
                    style={{
                        height: '40px',
                        width: '40px'
                    }}
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit />
                  </button>
                </div>
                <div className="ms-4">
                  <h1 className="mb-1">{profile.name}</h1>
                  <h4 className="text-muted mb-3">{profile.title}</h4>

                  <div className="d-flex align-items-center mb-2">
                    <div className="d-flex me-3">
                      {renderStars(Math.round(profile.ratings.average))}
                    </div>
                    <span className="text-muted">
                      {profile.ratings.average} ({profile.ratings.total}{" "}
                      reviews)
                    </span>
                  </div>

                  <div className="d-flex flex-wrap">
                    <div className="me-4 mb-2 d-flex align-items-center">
                      <Phone className="me-2 text-primary" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="me-4 mb-2 d-flex align-items-center">
                      <Mail className="me-2 text-primary" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <MapPin className="me-2 text-primary" />
                      <span>{profile.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Specialties Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Specializations</h5>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap">
                {profile.specialties.map((spec, index) => (
                  <span
                    key={index}
                    className="badge bg-primary bg-opacity-10 text-primary me-2 mb-2"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Languages Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Languages</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {profile.languages.map((lang, index) => (
                  <li key={index} className="list-group-item border-0 px-0">
                    <div className="d-flex align-items-center">
                      <Globe className="me-2 text-primary" />
                      <span>{lang}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Education</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {profile.education.map((edu) => (
                  <li
                    key={edu.id}
                    className="list-group-item border-0 px-0 py-3"
                  >
                    <div className="d-flex align-items-start">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <GraduationCap className="text-primary" />
                      </div>
                      <div>
                        <h6 className="mb-1">{edu.degree}</h6>
                        <p className="mb-1">{edu.institution}</p>
                        <small className="text-muted">{edu.year}</small>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white border-bottom">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "overview" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "experience" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("experience")}
                  >
                    Experience
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "reviews" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div>
                  <h5 className="mb-3">Professional Bio</h5>
                  <p className="mb-4">{profile.bio}</p>

                  <h5 className="mb-3">Rating Overview</h5>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="card bg-light border-0">
                        <div className="card-body text-center">
                          <h1 className="display-4 mb-0">
                            {profile.ratings.average}
                          </h1>
                          <div className="d-flex justify-content-center mb-2">
                            {renderStars(Math.round(profile.ratings.average))}
                          </div>
                          <p className="mb-0">
                            Based on {profile.ratings.total} reviews
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex flex-column">
                        {[5, 4, 3, 2, 1].map((stars, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center mb-2"
                          >
                            <small className="me-2" style={{ width: "30px" }}>
                              {stars} stars
                            </small>
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "10px" }}
                            >
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{
                                  width: `${
                                    (profile.ratings.breakdown[5 - stars] /
                                      profile.ratings.total) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <small className="ms-2 text-muted">
                              {profile.ratings.breakdown[5 - stars]}
                            </small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <ul className="list-group list-group-flush">
                  {profile.experience.map((exp) => (
                    <li
                      key={exp.id}
                      className="list-group-item border-0 px-0 py-3"
                    >
                      <div className="d-flex align-items-start">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                          <Briefcase className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">{exp.position}</h5>
                          <p className="mb-1">{exp.company}</p>
                          <small className="text-muted">{exp.duration}</small>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  {profile.reviews.map((review) => (
                    <div key={review.id} className="border-bottom pb-4 mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h5 className="mb-0">{review.client}</h5>
                          <small className="text-muted">{review.date}</small>
                        </div>
                        <div className="d-flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="mb-0">{review.comment}</p>
                    </div>
                  ))}

                  <button className="btn btn-outline-primary w-100">
                    Load More Reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;
