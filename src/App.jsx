// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './pages/PrivateRoute'; // Updated PrivateRoute
import HomePage from './pages/HomePage';
import CandidatePage from './pages/CandidatePage';
import Layout from './assets/Layout';
import Footer from './components/Footer';
import EditUser from './pageComponents/EditUser';
import ForbiddenPage from './pages/ForbiddenPage';
import RegisteredPartiesPage from './pageComponents/RegisterdParties';
import EditCandidatePage from './pageComponents/EdiitCandidatePage';
import QualifiedCandidatesPage from './pageComponents/QualifiedCandidates';
import RegisteredVoter from './pageComponents/RegisteredVoter';
import ElectionDetailsPage from './pageComponents/ElectionDetails';
import ElectionResultsPage from './pageComponents/ElectionsResult';
import ElectionStatisticsPage from './pageComponents/ElectionStatics';
import AddCandidatePage from './pageComponents/AddCandidatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<Layout />}>
          <Route path="/candidates" element={<CandidatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/editUser" element={<EditUser />} />
          
          <Route 
            path="/profile" 
            element={<PrivateRoute element={<ProfilePage />} requiredRole="user" />} 
          />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/403" element={<ForbiddenPage />} />
           <Route path="/registered-parties" element={<RegisteredPartiesPage />} />
           <Route path="/edit-candidate/:candidateId" element={<EditCandidatePage />} />
           <Route path="/qualified-candidates" element={<QualifiedCandidatesPage />} />
           <Route path="/registered-voters" element={<RegisteredVoter />} />
           <Route path="/election-details" element={<ElectionDetailsPage />} />
           <Route path="/election-statics" element={<ElectionStatisticsPage />} />
           <Route path="/election-results" element={<ElectionResultsPage/>} />
           <Route path="/add-candidates" element={<AddCandidatePage/>} />


        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
