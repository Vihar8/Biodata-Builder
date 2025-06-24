import React from 'react';
import { useField } from 'formik';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  as?: 'input' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  as = 'input',
  options = [],
  className = '',
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  const baseClasses = `
    w-full px-3 py-2 border rounded-md transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
    ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
  `;

  const renderField = () => {
    if (as === 'select') {
      return (
        <select {...field} className={baseClasses}>
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (as === 'textarea') {
      return (
        <textarea
          {...field}
          placeholder={placeholder}
          rows={3}
          className={baseClasses}
        />
      );
    }

    return (
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={baseClasses}
      />
    );
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {meta.error && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {hasError && (
        <p className="text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠</span>
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormField;