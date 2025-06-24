import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { CustomField } from '../types/biodata';

interface CustomFieldManagerProps {
  customFields: CustomField[];
  onAddField: (field: Omit<CustomField, 'id'>) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, value: string) => void;
}

const CustomFieldManager: React.FC<CustomFieldManagerProps> = ({
  customFields,
  onAddField,
  onRemoveField,
  onUpdateField,
}) => {
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldSection, setNewFieldSection] = useState<'personal' | 'family' | 'contact'>('personal');

  const handleAddField = () => {
    if (newFieldLabel.trim()) {
      onAddField({
        label: newFieldLabel,
        value: '',
        section: newFieldSection,
      });
      setNewFieldLabel('');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Custom Fields</h3>
      
      {/* Add new field */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <input
          type="text"
          placeholder="Field name (e.g., Horoscope)"
          value={newFieldLabel}
          onChange={(e) => setNewFieldLabel(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={newFieldSection}
          onChange={(e) => setNewFieldSection(e.target.value as 'personal' | 'family' | 'contact')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="personal">Personal</option>
          <option value="family">Family</option>
          <option value="contact">Contact</option>
        </select>
        <button
          type="button"
          onClick={handleAddField}
          className="flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Field
        </button>
      </div>

      {/* Existing custom fields */}
      {customFields.length > 0 && (
        <div className="space-y-3">
          {customFields.map((field) => (
            <div key={field.id} className="flex items-center space-x-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} ({field.section})
                </label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => onUpdateField(field.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
              <button
                type="button"
                onClick={() => onRemoveField(field.id)}
                className="flex-shrink-0 p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomFieldManager;