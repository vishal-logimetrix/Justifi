import React from 'react';

import gifi from "../assets/images/giphy.gif"

const OfflinePage = () => {
  return (
    <div style={styles.container}>
      {/* Offline animated GIF */}
      <img
        src={gifi}
        alt="Offline Animation"
        style={styles.image}
      />

      <h2 style={styles.title}>You're Offline</h2>
      <p style={styles.message}>
        Please check your internet connection and try again.
      </p>
      <span style={styles.note}>
        You will be active once you reconnect to the internet.
      </span>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(135deg, #e0eafc, #cfdef3)', // subtle gradient background
    color: '#2c3e50',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    filter: 'drop-shadow(0 0 10px rgba(44, 62, 80, 0.2))',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '15px',
    fontWeight: '700',
  },
  message: {
    fontSize: '1.25rem',
    marginBottom: '10px',
  },
  note: {
    fontSize: '1rem',
    color: '#555',
    fontStyle: 'italic',
  },
};

export default OfflinePage;
