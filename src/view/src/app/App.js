import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../features/Login/Login';

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

