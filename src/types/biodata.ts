export interface PersonalInfo {
  fullName: string;
  age: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  maritalStatus: string;
  religion: string;
  caste: string;
  subcaste: string;
  gotra: string;
  education: string;
  occupation: string;
  income: string;
  location: string;
  photo?: string;
}

export interface FamilyInfo {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  familyValues: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
  section: 'personal' | 'family' | 'contact';
}

export interface BiodataData {
  personal: PersonalInfo;
  family: FamilyInfo;
  contact: ContactInfo;
  customFields: CustomField[];
}

export interface FieldConfig {
  key: string;
  label: string;
  section: 'personal' | 'family' | 'contact';
  required: boolean;
  type?: 'text' | 'date' | 'select' | 'textarea' | 'tel' | 'email';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface FieldVisibility {
  [key: string]: boolean;
}