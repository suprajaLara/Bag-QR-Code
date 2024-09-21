import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';

const UserPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    mailid: '',
    address: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.firstname) {
          setUserData(data);
        } else {
          setIsFormVisible(true);
        }
      }
    };
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, formData);
    setUserData(formData);
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {userData ? (
          <div>
            <Typography variant="h4" gutterBottom>User Details</Typography>
            <Box mb={2}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>First Name:</Typography>
              <Typography variant="body1" style={{ color: '#555' }}>{userData.firstname}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Last Name:</Typography>
              <Typography variant="body1" style={{ color: '#555' }}>{userData.lastname}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Phone:</Typography>
              <Typography variant="body1" style={{ color: '#555' }}>{userData.phone}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Email:</Typography>
              <Typography variant="body1" style={{ color: '#555' }}>{userData.mailid}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Address:</Typography>
              <Typography variant="body1" style={{ color: '#555' }}>{userData.address}</Typography>
            </Box>
          </div>
        ) : isFormVisible ? (
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="First Name"
                name="firstname"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Last Name"
                name="lastname"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Phone"
                name="phone"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                name="mailid"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Address"
                name="address"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default UserPage;
