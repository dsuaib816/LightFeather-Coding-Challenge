// services/apiService.ts
import axios from 'axios';
import type { FormData } from '../types/FormData';

// Base URL for all API endpoints - points to Express backend server
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * API Service Layer
 * Handles all HTTP requests to the backend server
 * Abstracts axios implementation from components
 */
export const apiService = {
  /**
   * Fetches list of available supervisors from backend
   * @returns Promise<string[]> - Array of supervisor names
   * @throws Error if request fails (network issues, server down, etc.)
   */
  getSupervisors: async (): Promise<string[]> => {
    const response = await axios.get(`${API_BASE_URL}/supervisors`);
    return response.data;
  },

  /**
   * Submits form data to backend for processing
   * @param data - Form data containing user input (name, email, phone, supervisor)
   * @returns Promise<void> - Resolves on successful submission
   * @throws Error if submission fails (validation errors, network issues, etc.)
   */
  submitForm: async (data: FormData): Promise<void> => {
    await axios.post(`${API_BASE_URL}/submit`, data);
  }
};