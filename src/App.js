import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeComponent from './components/homeComponent';
import CandidatesList from './components/candidateList';
import Dashboard from './components/dashboard'
import { AppBar, Toolbar, Typography } from '@mui/material';
import Profile from './components/profile';

const App = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'John Doe', skills: 'JavaScript, React', yearsOfExperience: 5, location: 'New York', videoInterviewResults: 'Passed', codingResults: 'Excellent' },
    { id: 2, name: 'Jane Smith', skills: 'Python, Django', yearsOfExperience: 3, location: 'San Francisco', videoInterviewResults: 'Passed', codingResults: 'Good' },
  ]);

  const [droppableId, setDroppableId] = useState('candidates'); 

  const addCandidate = (candidate) => {
    const newCandidates = [...candidates, { ...candidate, id: candidates.length + 1 }];
    setCandidates(newCandidates);
    setDroppableId(`candidates-${newCandidates.length}`);
  };

  const updateCandidate = (index, updatedCandidate) => {
    const newCandidates = [...candidates];
    newCandidates[index] = updatedCandidate;
    setCandidates(newCandidates);
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="p" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
              Home
            </Typography>
            <Typography variant="p" component={Link} to="/add" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
              Add Candidate
            </Typography>
            <Typography variant="p" component={Link} to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
              Dashboard
            </Typography>
            <Typography variant="p" component={Link} to="/profile" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
              Profile
            </Typography>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <CandidatesList candidates={candidates} setCandidates={setCandidates} droppableId={droppableId} />
              </>
            }
          />
          <Route path="/add" element={<HomeComponent addCandidate={addCandidate} />} />
          <Route
            path="/edit/:index"
            element={<HomeComponent candidates={candidates} updateCandidate={updateCandidate} />}
          />
           <Route
            path="/dashboard"
            element={<Dashboard candidates={candidates} />}
          />
          <Route
            path="/profile"
            element={<Profile candidates={candidates} />}
          />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
