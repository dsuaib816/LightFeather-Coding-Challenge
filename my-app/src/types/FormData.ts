export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  supervisor: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  supervisor?: string;
}