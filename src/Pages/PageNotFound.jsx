import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.description}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <button onClick={handleGoBack} style={styles.button}>
        Go Back
      </button>
    </div>
  );
};

// Inline styles for basic design
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '10%',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '3rem',
    color: '#e74c3c',
  },
  description: {
    fontSize: '1.2rem',
    margin: '20px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PageNotFound;
