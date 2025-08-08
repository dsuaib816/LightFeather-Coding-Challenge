// components/AlertMessage.tsx
import React from 'react';

/**
 * Props interface for AlertMessage component
 */
interface AlertMessageProps {
  message: string;
  type: 'success' | 'error';
}

/**
 * AlertMessage Component
 * Displays success or error messages with appropriate styling
 * Uses role="alert" for accessibility (screen readers)
 * 
 * @param message - The text message to display to the user
 * @param type - 'success' for green styling, 'error' for red styling
 */
export const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
  const isSuccess = type === 'success';
  
  return (
    <div
      role="alert"
      className={`mb-4 rounded shadow ${
        isSuccess
          ? 'bg-green-100 border border-green-400'
          : 'bg-red-100 border border-red-400'
      }`}
    >
      <div
        className={`rounded-t px-4 py-2 ${
          isSuccess ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};