import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, Avatar, Typography, Box, DialogContent, DialogTitle, Button
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import CallEndIcon from '@mui/icons-material/CallEnd';

const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543210" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "5551234567" },
];

const Call = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    let timer;
    if (openDialog) {
      setCallTime(0); // Reset timer on every new call
      timer = setInterval(() => setCallTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [openDialog]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCallClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setCallTime(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>Users List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleCallClick(user)}>
                    <CallIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 3, minWidth: 350, p: 2, textAlign: 'center' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Calling...
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "#1976d2", width: 72, height: 72 }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              {selectedUser?.name}
            </Typography>
            <Typography color="text.secondary">Connecting...</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Call Time: {formatTime(callTime)}
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<CallEndIcon />}
              sx={{ mt: 2, px: 4 }}
              onClick={handleClose}
            >
              End Call
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Call;
