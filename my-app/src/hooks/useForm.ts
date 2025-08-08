// hooks/useForm.ts
import { useState } from 'react';
import * as yup from 'yup';

/**
 * Props interface for the useForm hook
 * @template T - The type of the form data object
 */
interface UseFormProps<T> {
  initialValues: T;
  validationSchema: yup.ObjectSchema<any>;
}

/**
 * Custom hook for managing form state, validation, and user interactions
 * Provides a reusable form management solution with Yup validation
 * 
 * @template T - The type of the form data (extends Record<string, any>)
 * @param initialValues - Initial form data values
 * @param validationSchema - Yup schema for form validation
 * @returns Object containing form data, errors, and handler functions
 */
export const useForm = <T extends Record<string, any>>({ 
  initialValues, 
  validationSchema 
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors({});
  };

  const validate = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const errMap: Partial<Record<keyof T, string>> = {};
        err.inner.forEach((e: any) => {
          errMap[e.path as keyof T] = e.message;
        });
        setErrors(errMap);
      }
      return false;
    }
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    resetForm,
    setErrors
  };
};