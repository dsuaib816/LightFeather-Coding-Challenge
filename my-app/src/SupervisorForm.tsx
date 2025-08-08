import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  supervisor: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  supervisor?: string;
}

const schema = yup.object().shape({
  firstName: yup.string().matches(/^[A-Za-z]+$/, 'Only letters allowed').required('First name is required'),
  lastName: yup.string().matches(/^[A-Za-z]+$/, 'Only letters allowed').required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .nullable()
    .transform((v: any) => v === '' ? null : v),
  phoneNumber: yup
    .string()
    .matches(/^[0-9\-().\s]{7,}$/, 'Invalid phone number')
    .notRequired()
    .nullable()
    .transform((v: any) => v === '' ? null : v),
  supervisor: yup.string().required('Supervisor is required')
});

const SupervisorForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    supervisor: ''
  });
  const [supervisors, setSupervisors] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string>('');

  // Load supervisors from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/supervisors')
      .then((res: any) => setSupervisors(res.data))
      .catch(() => setMessage('Failed to load supervisors'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors({});
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      await schema.validate(formData, { abortEarly: false });
      
      await axios.post('http://localhost:8080/api/submit', formData);
      setMessage('Submission successful!');
      setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', supervisor: '' });
      setErrors({});
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const errMap: FormErrors = {};
        err.inner.forEach((e: any) => {
          errMap[e.path as keyof FormErrors] = e.message;
        });
        setErrors(errMap);
      } else if (err.response && err.response.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage('An error occurred while submitting.');
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-[#222] rounded-xl shadow-md py-8 px-8">
          <h2 className="text-[28px] font-bold text-white mb-6 text-center">
            Notification Form
          </h2>
          {message && (
            <div
              role="alert"
              className={`mb-4 rounded shadow ${
                message.includes('successful')
                  ? 'bg-green-100 border border-green-400'
                  : 'bg-red-100 border border-red-400'
              }`}
            >
              <div
                className={`rounded-t px-4 py-2 ${
                  message.includes('successful') ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
                }`}
              >
                <p>{message}</p>
              </div>
            </div>
          )}
          <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2 flex flex-col">
                <input
                  placeholder="First Name*"
                  className="bg-gray-700 text-white border-0 rounded-md p-2"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
              </div>
              <div className="w-1/2 flex flex-col">
                <input
                  placeholder="Last Name*"
                  className="bg-gray-700 text-white border-0 rounded-md p-2"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2 flex flex-col">
                <input
                  placeholder="Email"
                  className="text-white bg-gray-700 border-0 rounded-md p-2"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="w-1/2 flex flex-col">
                <input
                  placeholder="Phone Number"
                  className="text-gray-400 bg-gray-700 border-0 rounded-md p-2"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
              </div>
            </div>
            <select
              className="text-gray-400 bg-gray-700 border-0 rounded-md p-2 mx-auto w-fit"
              name="supervisor"
              value={formData.supervisor}
              onChange={handleChange}
            >
              <option value="">-- Select a Supervisor --</option>
              {supervisors.map((sup, index) => (
                <option key={index} value={sup}>{sup}</option>
              ))}
            </select>
            {errors.supervisor && <p className="mx-auto text-red-500">{errors.supervisor}</p>}
            <button
              className="bg-indigo-500 font-bold hover:bg-indigo-600 text-white py-2 px-4 rounded-md mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupervisorForm;
