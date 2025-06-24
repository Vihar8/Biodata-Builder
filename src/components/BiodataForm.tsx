import React, { useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { BiodataData, CustomField, FieldVisibility, FieldConfig } from '../types/biodata';
import { biodataValidationSchema } from '../validation/biodataValidation';
import FormField from './FormField';
import PhotoUpload from './PhotoUpload';
import CustomFieldManager from './CustomFieldManager';
import FieldToggleManager from './FieldToggleManager';
import { defaultFieldConfigs } from '../utils/fieldConfigs';

interface BiodataFormProps {
  initialValues: BiodataData;
  onSubmit: (values: BiodataData) => void;
  customFields: CustomField[];
  onAddCustomField: (field: Omit<CustomField, 'id'>) => void;
  onRemoveCustomField: (id: string) => void;
  onUpdateCustomField: (id: string, value: string) => void;
  fieldVisibility: FieldVisibility;
  onToggleField: (fieldKey: string) => void;
}

const BiodataForm: React.FC<BiodataFormProps> = ({
  initialValues,
  onSubmit,
  customFields,
  onAddCustomField,
  onRemoveCustomField,
  onUpdateCustomField,
  fieldVisibility,
  onToggleField,
}) => {
  const renderFieldsBySection = (section: 'personal' | 'family' | 'contact', values: BiodataData, setFieldValue: any) => {
    const sectionFields = defaultFieldConfigs.filter(field => 
      field.section === section && fieldVisibility[field.key]
    );

    return sectionFields.map((fieldConfig) => {
      if (fieldConfig.key === 'personal.photo') return null; // Handle photo separately
      
      return (
        <FormField
          key={fieldConfig.key}
          name={fieldConfig.key}
          label={fieldConfig.label}
          type={fieldConfig.type || 'text'}
          placeholder={fieldConfig.placeholder}
          as={fieldConfig.type === 'select' ? 'select' : fieldConfig.type === 'textarea' ? 'textarea' : 'input'}
          options={fieldConfig.options || []}
        />
      );
    });
  };

  // Component to handle real-time updates
  const FormObserver: React.FC<{ formik: FormikProps<BiodataData> }> = ({ formik }) => {
    useEffect(() => {
      // Update preview whenever form values change
      onSubmit(formik.values);
    }, [formik.values]);

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Field Toggle Manager */}
      <FieldToggleManager
        fieldConfigs={defaultFieldConfigs}
        fieldVisibility={fieldVisibility}
        onToggleField={onToggleField}
      />

      {/* Main Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Biodata Information</h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={biodataValidationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => (
            <Form className="space-y-6">
              {/* Observer component for real-time updates */}
              <FormObserver formik={formik} />
              
              {/* Personal Information */}
              {defaultFieldConfigs.some(field => field.section === 'personal' && fieldVisibility[field.key]) && (
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderFieldsBySection('personal', formik.values, formik.setFieldValue)}
                  </div>
                  
                  {/* Photo Upload - Always show if personal section has visible fields */}
                  <div className="mt-4">
                    <PhotoUpload
                      photo={formik.values.personal.photo}
                      onPhotoChange={(photo) => formik.setFieldValue('personal.photo', photo)}
                    />
                  </div>
                </div>
              )}

              {/* Family Information */}
              {defaultFieldConfigs.some(field => field.section === 'family' && fieldVisibility[field.key]) && (
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Family Background</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderFieldsBySection('family', formik.values, formik.setFieldValue)}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {defaultFieldConfigs.some(field => field.section === 'contact' && fieldVisibility[field.key]) && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderFieldsBySection('contact', formik.values, formik.setFieldValue)}
                  </div>
                </div>
              )}

              {/* Custom Fields */}
              <CustomFieldManager
                customFields={customFields}
                onAddField={onAddCustomField}
                onRemoveField={onRemoveCustomField}
                onUpdateField={onUpdateCustomField}
              />

              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  ✨ Your biodata preview updates automatically as you type!
                </p>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-6 rounded-md hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg"
                >
                  Refresh Preview
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BiodataForm;