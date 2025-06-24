import * as Yup from 'yup';

export const biodataValidationSchema = Yup.object({
  personal: Yup.object({
    fullName: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Full name is required'),
    age: Yup.string()
      .matches(/^\d+$/, 'Age must be a number')
      .required('Age is required'),
    dateOfBirth: Yup.string().required('Date of birth is required'),
    height: Yup.string().required('Height is required'),
    weight: Yup.string().required('Weight is required'),
    complexion: Yup.string().required('Complexion is required'),
    bloodGroup: Yup.string().required('Blood group is required'),
    maritalStatus: Yup.string().required('Marital status is required'),
    religion: Yup.string().required('Religion is required'),
    caste: Yup.string().required('Caste is required'),
    subcaste: Yup.string(),
    gotra: Yup.string(),
    education: Yup.string().required('Education is required'),
    occupation: Yup.string().required('Occupation is required'),
    income: Yup.string().required('Income is required'),
    location: Yup.string().required('Location is required'),
  }),
  family: Yup.object({
    fatherName: Yup.string().required('Father\'s name is required'),
    fatherOccupation: Yup.string().required('Father\'s occupation is required'),
    motherName: Yup.string().required('Mother\'s name is required'),
    motherOccupation: Yup.string().required('Mother\'s occupation is required'),
    siblings: Yup.string().required('Siblings information is required'),
    familyType: Yup.string().required('Family type is required'),
    familyValues: Yup.string().required('Family values are required'),
  }),
  contact: Yup.object({
    phone: Yup.string()
      .matches(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    address: Yup.string().required('Address is required'),
  }),
});