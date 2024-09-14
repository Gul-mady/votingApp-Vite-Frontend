import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';

const CandidatePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [voteRecords, setVoteRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          alert('No token found. Please log in again.');
          console.log('No token found');
          return;
        }

        const response = await axios.get('https://voting-app-x15.vercel.app/candidate/getCandidates', {
          headers: {
            'x-access-token': token
          }
        });
        setCandidates(response.data);

        // Fetch vote counts
        const voteCountResponse = await axios.get('https://voting-app-x15.vercel.app/candidate/vote/count', {
          headers: {
            'x-access-token': token
          }
        });
        setVoteRecords(voteCountResponse.data.voteRecord);

      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const fetchVoteCounts = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        alert('No token found. Please log in again.');
        return;
      }

      const voteCountResponse = await axios.get('https://voting-app-x15.vercel.app/candidate/vote/count', {
        headers: {
          'x-access-token': token
        }
      });
      setVoteRecords(voteCountResponse.data.voteRecord);
    } catch (error) {
      console.error('Error fetching vote counts', error);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        alert('No token found. Please log in again.');
        return;
      }

      // Record the vote
      await axios.post(
        `https://voting-app-x15.vercel.app/candidate/vote/${candidateId}`,
        {},
        {
          headers: {
            'x-access-token': token
          }
        }
      );

      // Re-fetch vote counts
      await fetchVoteCounts();
      
      alert('Vote recorded successfully');
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An error occurred while voting. Please try again.');
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#151515] text-[#eeeeee]">
  Loading...
</div>
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6 bg-[#151515] text-[#eeeeee] min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#73659e]">Candidates</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <ul className="space-y-6 md:col-span-2">
          {candidates.map(candidate => (
            <li key={candidate._id} className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
              <h2 className="text-2xl font-semibold text-[#eeeeee] mb-2">{candidate.name}</h2>
              <p className="text-gray-400 mb-4">{candidate.description}</p>
              <Button 
                text="Vote" 
                onClick={() => handleVote(candidate._id)} 
                className="bg-[#73659e] hover:bg-[#a91d3a] text-[#eeeeee]"
              />
            </li>
          ))}
        </ul>
        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#eeeeee] mb-4">Vote Counts</h2>
          <ul>
            {voteRecords.map((record, index) => (
              <li key={index} className="text-gray-400 text-lg mb-2">
                {record.party}: <span className="font-semibold">{record.count} votes</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CandidatePage;
