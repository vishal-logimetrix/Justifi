import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, Avatar, Typography, Box, DialogContent, DialogTitle, Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';

// Dummy data: received call logs
const receivedCalls = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    time: "2025-07-18 14:32",
    duration: 125, // in seconds
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543210",
    time: "2025-07-17 10:12",
    duration: 235,
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "5551234567",
    time: "2025-07-16 16:45",
    duration: 80,
  },
];

const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

const Call = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleViewDetails = (call) => {
    setSelectedCall(call);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedCall(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>Received Calls</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receivedCalls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>{call.name}</TableCell>
                <TableCell>{call.email}</TableCell>
                <TableCell>{call.phone}</TableCell>
                <TableCell>{call.time}</TableCell>
                <TableCell>{formatTime(call.duration)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleViewDetails(call)}>
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 3, minWidth: 350, p: 2, textAlign: 'center' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Call Details
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "#1976d2", width: 72, height: 72 }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              {selectedCall?.name}
            </Typography>
            <Typography>Email: {selectedCall?.email}</Typography>
            <Typography>Phone: {selectedCall?.phone}</Typography>
            <Typography>Time: {selectedCall?.time}</Typography>
            <Typography>Duration: {formatTime(selectedCall?.duration || 0)}</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Call;
