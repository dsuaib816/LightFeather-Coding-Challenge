// validation/supervisorFormSchema.ts
import * as yup from 'yup';

export const supervisorFormSchema = yup.object().shape({
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