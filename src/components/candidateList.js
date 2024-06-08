import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const CandidatesList = ({ candidates, setCandidates }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  useEffect(() => {
    setFilteredCandidates(candidates);
  }, [candidates]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.index === destination.index) return;

    const reorderedCandidates = Array.from(filteredCandidates);
    const [movedCandidate] = reorderedCandidates.splice(source.index, 1);
    reorderedCandidates.splice(destination.index, 0, movedCandidate);

    setCandidates(reorderedCandidates); 
  };

  const handleSearch = () => {
    const filtered = candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCandidates(filtered);
  };

  const handleAddCandidate = () => {
    navigate('/add');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Registered Candidates
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleAddCandidate}>
          Add Candidate
        </Button>
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="candidates-list">
          {(provided) => (
            <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      {/* <DragIndicatorIcon /> */}
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Skills</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Years of Experience</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Location</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Video Interview Results</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Coding Results</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCandidates.map((candidate, index) => (
                   
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TableCell>
                          </TableCell>
                          <TableCell>{candidate.name}</TableCell>
                          <TableCell>{candidate.skills}</TableCell>
                          <TableCell>{candidate.yearsOfExperience}</TableCell>
                          <TableCell>{candidate.location}</TableCell>
                          <TableCell>{candidate.videoInterviewResults}</TableCell>
                          <TableCell>{candidate.codingResults}</TableCell>
                          <TableCell>
                            <Button variant="contained" color="secondary" onClick={() => navigate(`/edit/${index}`)}>
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                   
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default CandidatesList;
