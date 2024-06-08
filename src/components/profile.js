import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, Grid } from '@mui/material';

const Profile = ({ candidates }) => {
  return (
    <Container maxWidth="md">
      {candidates.map((candidate, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          my={2}
        >
          <Card style={{ width: '100%' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    alt={candidate.name}
                    src={candidate.avatar} 
                    style={{ width: 80, height: 80 }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Candidate Profile
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Name: {candidate.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Skills: {candidate.skills}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Years of Experience: {candidate.yearsOfExperience}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Location: {candidate.location}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Video Interview Results: {candidate.videoInterviewResults}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Coding Results: {candidate.codingResults}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Container>
  );
};

export default Profile;
