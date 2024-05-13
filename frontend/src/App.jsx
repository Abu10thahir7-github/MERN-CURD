// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './CreateUser';
import GetUsers from './GetUsers';
import "./App.css"
import EditUsers from './EditUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetUsers />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/editUser/:id"  element={<EditUsers />}/>
      </Routes>
    </Router>
  );
}

export default App;
