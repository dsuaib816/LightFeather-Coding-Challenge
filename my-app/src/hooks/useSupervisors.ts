// hooks/useSupervisors.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for managing supervisor data from API
 * Handles loading state, error handling, and data fetching
 * @returns Object containing supervisors array, loading state, and error message
 */
export const useSupervisors = () => {
  const [supervisors, setSupervisors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Effect runs once on component mount to fetch supervisors
  useEffect(() => {
    /**
     * Async function to fetch supervisors from backend API
     * Updates state based on success or failure of the request
     */
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/supervisors');
        setSupervisors(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load supervisors');
        console.error('Error fetching supervisors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSupervisors();
  }, []);

  return { supervisors, loading, error };
};