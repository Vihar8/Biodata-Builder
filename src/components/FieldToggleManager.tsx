import React, { useState } from 'react';
import { Eye, EyeOff, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { FieldConfig, FieldVisibility } from '../types/biodata';

interface FieldToggleManagerProps {
  fieldConfigs: FieldConfig[];
  fieldVisibility: FieldVisibility;
  onToggleField: (fieldKey: string) => void;
}

const FieldToggleManager: React.FC<FieldToggleManagerProps> = ({
  fieldConfigs,
  fieldVisibility,
  onToggleField,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const groupedFields = fieldConfigs.reduce((acc, field) => {
    if (!acc[field.section]) {
      acc[field.section] = [];
    }
    acc[field.section].push(field);
    return acc;
  }, {} as Record<string, FieldConfig[]>);

  const sectionTitles = {
    personal: 'Personal Information',
    family: 'Family Background',
    contact: 'Contact Details',
  };

  const sectionColors = {
    personal: 'bg-amber-50 border-amber-200',
    family: 'bg-red-50 border-red-200',
    contact: 'bg-green-50 border-green-200',
  };

  const getVisibleCount = (section: string) => {
    return groupedFields[section]?.filter(field => fieldVisibility[field.key]).length || 0;
  };

  const getTotalCount = (section: string) => {
    return groupedFields[section]?.length || 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Field Manager</h2>
            <p className="text-sm text-gray-600">Show/hide fields in your biodata</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {Object.values(fieldVisibility).filter(Boolean).length} of {fieldConfigs.length} fields visible
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          {Object.entries(groupedFields).map(([section, fields]) => (
            <div key={section} className={`rounded-lg border p-4 ${sectionColors[section as keyof typeof sectionColors]}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">
                  {sectionTitles[section as keyof typeof sectionTitles]}
                </h3>
                <span className="text-sm text-gray-600">
                  {getVisibleCount(section)} / {getTotalCount(section)} visible
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={`flex items-center justify-between p-3 rounded-md border transition-all duration-200 ${
                      fieldVisibility[field.key]
                        ? 'bg-white border-gray-200 shadow-sm'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        fieldVisibility[field.key] ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {field.label}
                      </span>
                      {field.required && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => onToggleField(field.key)}
                      disabled={field.required}
                      className={`p-1 rounded-md transition-colors ${
                        field.required
                          ? 'cursor-not-allowed opacity-50'
                          : fieldVisibility[field.key]
                          ? 'text-green-600 hover:bg-green-100'
                          : 'text-gray-400 hover:bg-gray-200'
                      }`}
                      title={field.required ? 'This field is required and cannot be hidden' : 
                             fieldVisibility[field.key] ? 'Hide field' : 'Show field'}
                    >
                      {fieldVisibility[field.key] ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Field Management Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Required fields (marked with "Required") cannot be hidden</li>
                  <li>• Hidden fields won't appear in the preview or PDF</li>
                  <li>• You can always show hidden fields again later</li>
                  <li>• Custom fields can be managed separately below</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldToggleManager;