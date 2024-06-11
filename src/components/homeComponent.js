import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const HomeComponent = ({ addCandidate, updateCandidate, candidates }) => {
  const { id } = useParams();
  const isEditMode = id !== undefined;
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    yearsOfExperience: '',
    location: '',
    videoInterviewResults: '',
    codingResults: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && candidates.length > 0) {
      const candidate = candidates.find(candidate => candidate._id === id);
      if (candidate) setFormData(candidate);
    }
  }, [isEditMode, id, candidates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'yearsOfExperience' ? parseInt(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      if (isEditMode) {
        updateCandidate(id, formData);
      } else {
        addCandidate(formData);
      }
      navigate('/');
    } else {
      setErrors(validationErrors);
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = 'Name is required';
    }
    if (!data.skills) {
      errors.skills = 'Skills are required';
    }
    if (data.yearsOfExperience === '' || isNaN(data.yearsOfExperience) || data.yearsOfExperience < 0) {
      errors.yearsOfExperience = 'Years of Experience must be a valid number';
    }
    if (!data.location) {
      errors.location = 'Location is required';
    }
    if (!data.videoInterviewResults) {
      errors.videoInterviewResults = 'Video Interview Results are required';
    }
    if (!data.codingResults) {
      errors.codingResults = 'Coding Results are required';
    }
    return errors;
  };
  
  

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
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
                error={errors.name}
                helperText={errors.name && errors.name}
              />
              <TextField
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors.skills}
                helperText={errors.skills && errors.skills}
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
                error={errors.yearsOfExperience}
                helperText={errors.yearsOfExperience && errors.yearsOfExperience}
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors.location}
                helperText={errors.location && errors.location}
              />
              <TextField
                label="Video Interview Results"
                name="videoInterviewResults"
                value={formData.videoInterviewResults}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors.videoInterviewResults}
                helperText={errors.videoInterviewResults && errors.videoInterviewResults}
              />
              <TextField
                label="Coding Results"
                name="codingResults"
                value={formData.codingResults}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors.codingResults}
                helperText={errors.codingResults && errors.codingResults}
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
