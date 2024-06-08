import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const HomeComponent = ({ addCandidate, updateCandidate, candidates }) => {
  const { index } = useParams();
  const isEditMode = index !== undefined;
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    yearsOfExperience: '',
    location: '',
    videoInterviewResults: '',
    codingResults: '',
  });

  useEffect(() => {
    if (isEditMode && candidates[index]) {
      setFormData(candidates[index]);
    }
  }, [isEditMode, index, candidates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateCandidate(index, formData);
    } else {
      addCandidate(formData);
    }
    navigate('/');
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {isEditMode ? 'Edit Candidate' : 'Add New Candidate'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Years of Experience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Video Interview Results"
                name="videoInterviewResults"
                value={formData.videoInterviewResults}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Coding Results"
                name="codingResults"
                value={formData.codingResults}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Box>
              <Box mt={2}>
                <Button onClick={handleBack} variant="outlined" color="primary" fullWidth>
                  Back
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default HomeComponent;
