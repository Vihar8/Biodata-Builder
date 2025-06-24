import { FieldConfig } from '../types/biodata';

export const defaultFieldConfigs: FieldConfig[] = [
  // Personal Information Fields
  { key: 'personal.fullName', label: 'Full Name', section: 'personal', required: true },
  { key: 'personal.age', label: 'Age', section: 'personal', required: false },
  { key: 'personal.dateOfBirth', label: 'Date of Birth', section: 'personal', required: false, type: 'date' },
  { key: 'personal.height', label: 'Height', section: 'personal', required: false, placeholder: "e.g., 5'6\"" },
  { key: 'personal.weight', label: 'Weight', section: 'personal', required: false, placeholder: 'e.g., 65 kg' },
  { 
    key: 'personal.complexion', 
    label: 'Complexion', 
    section: 'personal', 
    required: false, 
    type: 'select',
    options: [
      { value: 'Fair', label: 'Fair' },
      { value: 'Wheatish', label: 'Wheatish' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Dark', label: 'Dark' },
    ]
  },
  { 
    key: 'personal.bloodGroup', 
    label: 'Blood Group', 
    section: 'personal', 
    required: false, 
    type: 'select',
    options: [
      { value: 'A+', label: 'A+' },
      { value: 'A-', label: 'A-' },
      { value: 'B+', label: 'B+' },
      { value: 'B-', label: 'B-' },
      { value: 'AB+', label: 'AB+' },
      { value: 'AB-', label: 'AB-' },
      { value: 'O+', label: 'O+' },
      { value: 'O-', label: 'O-' },
    ]
  },
  { 
    key: 'personal.maritalStatus', 
    label: 'Marital Status', 
    section: 'personal', 
    required: false, 
    type: 'select',
    options: [
      { value: 'Never Married', label: 'Never Married' },
      { value: 'Divorced', label: 'Divorced' },
      { value: 'Widowed', label: 'Widowed' },
    ]
  },
  { key: 'personal.religion', label: 'Religion', section: 'personal', required: false },
  { key: 'personal.caste', label: 'Caste', section: 'personal', required: false },
  { key: 'personal.subcaste', label: 'Subcaste', section: 'personal', required: false },
  { key: 'personal.gotra', label: 'Gotra', section: 'personal', required: false },
  { key: 'personal.education', label: 'Education', section: 'personal', required: false },
  { key: 'personal.occupation', label: 'Occupation', section: 'personal', required: false },
  { key: 'personal.income', label: 'Annual Income', section: 'personal', required: false, placeholder: 'e.g., ₹5-7 LPA' },
  { key: 'personal.location', label: 'Current Location', section: 'personal', required: false },

  // Family Information Fields
  { key: 'family.fatherName', label: "Father's Name", section: 'family', required: false },
  { key: 'family.fatherOccupation', label: "Father's Occupation", section: 'family', required: false },
  { key: 'family.motherName', label: "Mother's Name", section: 'family', required: false },
  { key: 'family.motherOccupation', label: "Mother's Occupation", section: 'family', required: false },
  { key: 'family.siblings', label: 'Siblings', section: 'family', required: false, placeholder: 'e.g., 1 brother, 1 sister' },
  { 
    key: 'family.familyType', 
    label: 'Family Type', 
    section: 'family', 
    required: false, 
    type: 'select',
    options: [
      { value: 'Joint Family', label: 'Joint Family' },
      { value: 'Nuclear Family', label: 'Nuclear Family' },
    ]
  },
  { key: 'family.familyValues', label: 'Family Values', section: 'family', required: false, type: 'textarea' },

  // Contact Information Fields
  { key: 'contact.phone', label: 'Phone Number', section: 'contact', required: true, type: 'tel' },
  { key: 'contact.email', label: 'Email Address', section: 'contact', required: false, type: 'email' },
  { key: 'contact.address', label: 'Address', section: 'contact', required: false, type: 'textarea' },
];

export const getDefaultFieldVisibility = (): Record<string, boolean> => {
  return defaultFieldConfigs.reduce((acc, field) => {
    acc[field.key] = true; // All fields visible by default
    return acc;
  }, {} as Record<string, boolean>);
};