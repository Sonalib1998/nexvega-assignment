import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import HomeComponent from './components/homeComponent';
import CandidatesList from './components/candidateList';
import Dashboard from './components/dashboard';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Profile from './components/profile';

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [droppableId, setDroppableId] = useState('candidates');
const apiUrl ='http://localhost:3000/api/candidates'
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  const addCandidate = (candidate) => {
    axios.post(apiUrl, candidate)
      .then(response => {
        const newCandidate = response.data;
        const prevCandidates = candidates;
        setCandidates([...prevCandidates, newCandidate]);
        setDroppableId(`candidates-${prevCandidates.length + 1}`);
      })
      .catch(error => console.error('Error adding candidate:', error));
  };

  const updateCandidate = (id, updatedCandidate) => {
    axios.put(`${apiUrl}/${id}`, updatedCandidate)
      .then(response => {
        const updated = response.data;
        setCandidates(prevCandidates =>
          prevCandidates.map(candidate => candidate._id === id ? updated : candidate)
        );
      })
      .catch(error => console.error('Error updating candidate:', error));
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
              <CandidatesList candidates={candidates} setCandidates={setCandidates} droppableId={droppableId} />
            }
          />
          <Route path="/add" element={<HomeComponent addCandidate={addCandidate} />} />
          <Route
            path="/edit/:id"
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
