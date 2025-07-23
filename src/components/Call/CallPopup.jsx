
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Avatar } from '@mui/material';
import { Phone, PhoneOff } from 'lucide-react';
import { useCallContext } from '../../Context/CallContext';


const CallPopup = () => {
  const { 
    incomingCall, 
    showCallPopup, 
    handleAcceptCall, 
    handleRejectCall 
  } = useCallContext();

  if (!incomingCall || !showCallPopup) return null;

  return (
    <Dialog 
      open={showCallPopup} 
      maxWidth="xs" 
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c)',
          color: 'white',
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="h5" fontWeight={700}>
          Incoming Call
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Avatar 
          src={incomingCall.callerAvatar} 
          sx={{ 
            width: 80, 
            height: 80, 
            margin: '0 auto 20px',
            border: '3px solid white'
          }} 
        />
        <Typography variant="h6" fontWeight={600}>
          {incomingCall.callerName}
        </Typography>
        <Typography variant="body1" mt={1}>
          {incomingCall.callerPhone}
        </Typography>
        <Typography variant="body2" mt={2} fontStyle="italic">
          Case: {incomingCall.caseTitle}
        </Typography>
        
        {/* Hidden audio element for ringtone */}
        <audio autoPlay loop>
          <source src="/ringtone.mp3" type="audio/mpeg" />
        </audio>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 4, px: 4 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<PhoneOff size={24} />}
          onClick={handleRejectCall}
          sx={{
            borderRadius: '50px',
            px: 4,
            py: 1.5,
            fontWeight: 700,
            backgroundColor: '#e53935',
            '&:hover': { backgroundColor: '#c62828' }
          }}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<Phone size={24} />}
          onClick={handleAcceptCall}
          sx={{
            borderRadius: '50px',
            px: 4,
            py: 1.5,
            fontWeight: 700,
            ml: 2,
            backgroundColor: '#43a047',
            '&:hover': { backgroundColor: '#2e7d32' }
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CallPopup;