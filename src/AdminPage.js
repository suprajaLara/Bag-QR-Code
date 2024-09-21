import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react';
import { Box, Button, Typography, Paper, Container } from '@mui/material';

const AdminPage = () => {
  const [userId, setUserId] = useState(null);

  const generateUser = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      firstname: '',
      lastname: '',
      phone: '',
      mailid: '',
      address: ''
    });
    setUserId(docRef.id);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Admin Page
        </Typography>
        
        <Button variant="contained" color="primary" onClick={generateUser} style={{ marginTop: '20px' }}>
          Generate User and QR Code
        </Button>

        {userId && (
          <Box mt={3}>
            <Typography variant="h6">QR Code for UserId: {userId}</Typography>
            <QRCodeCanvas value={`${window.location.origin}/user/${userId}`} size={200} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdminPage;