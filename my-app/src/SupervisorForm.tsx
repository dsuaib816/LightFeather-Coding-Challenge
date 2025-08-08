import React, { useState } from 'react';
import { useForm } from './hooks/useForm';
import { useSupervisors } from './hooks/useSupervisors';
import { FormField } from './components/FormField';
import { SupervisorSelect } from './components/SupervisorSelect';
import { AlertMessage } from './components/AlertMessage';
import { supervisorFormSchema } from './validation/supervisorFormSchema';
import { apiService } from './services/apiService';
import { FormData } from './types/FormData';

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  supervisor: ''
};

/**
 * SupervisorForm Component
 * Main form component for submitting supervisor notifications
 * Handles form validation, submission, and error states
 */
const SupervisorForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom hook to fetch supervisors list from API
  const { supervisors, loading: supervisorsLoading, error: supervisorsError } = useSupervisors();
  
  // Custom hook for form management with validation
  const {
    formData,
    errors,
    handleChange,
    validate,
    resetForm
  } = useForm({
    initialValues: initialFormData,
    validationSchema: supervisorFormSchema
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      // Validate all form fields using Yup schema
      const isValid = await validate();
      if (!isValid) return;

      // Submit form data to backend API
      await apiService.submitForm(formData);
      setMessage('Submission successful!');
      resetForm();
    } catch (err: any) {
      if (err.response?.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage('An error occurred while submitting. Please refresh the page and try again.');
      }
    } finally {
      // Always reset loading state, regardless of success/failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-[#222] rounded-xl shadow-md py-8 px-8">
        <h2 className="text-[28px] font-bold text-white mb-6 text-center">
          Notification Form
        </h2>

        {supervisorsError && (
          <AlertMessage message={supervisorsError} type="error" />
        )}
        {message && (
          <AlertMessage 
            message={message} 
            type={message.includes('successful') ? 'success' : 'error'} 
          />
        )}

        <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <FormField
                placeholder="First Name*"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
            </div>
            <div className="w-1/2">
              <FormField
                placeholder="Last Name*"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
          </div>
          
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <FormField
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                type="email"
                className="text-white bg-gray-700 border-0 rounded-md p-2"
              />
            </div>
            <div className="w-1/2">
              <FormField
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
                className="text-gray-400 bg-gray-700 border-0 rounded-md p-2"
              />
            </div>
          </div>
          
          <SupervisorSelect
            supervisors={supervisors}
            value={formData.supervisor}
            onChange={handleChange}
            error={errors.supervisor}
          />
          
          <button
            className="bg-indigo-500 font-bold hover:bg-indigo-600 text-white py-2 px-4 rounded-md mt-4 disabled:opacity-50"
            type="submit"
            disabled={isSubmitting || supervisorsLoading}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupervisorForm;