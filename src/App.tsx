import React, { useState, useCallback } from 'react';
import { Download, FileText } from 'lucide-react';
import { BiodataData, CustomField, FieldVisibility } from './types/biodata';
import BiodataForm from './components/BiodataForm';
import BiodataPreview from './components/BiodataPreview';
import { generatePDF } from './utils/pdfGenerator';
import { getDefaultFieldVisibility } from './utils/fieldConfigs';
import './index.css';

function App() {
  const [biodataData, setBiodataData] = useState<BiodataData>({
    personal: {
      fullName: '',
      age: '',
      dateOfBirth: '',
      height: '',
      weight: '',
      complexion: '',
      bloodGroup: '',
      maritalStatus: '',
      religion: '',
      caste: '',
      subcaste: '',
      gotra: '',
      education: '',
      occupation: '',
      income: '',
      location: '',
      photo: undefined,
    },
    family: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      siblings: '',
      familyType: '',
      familyValues: '',
    },
    contact: {
      phone: '',
      email: '',
      address: '',
    },
    customFields: [],
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [fieldVisibility, setFieldVisibility] = useState<FieldVisibility>(getDefaultFieldVisibility());
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleFormSubmit = useCallback((values: BiodataData) => {
    setBiodataData(values);
  }, []);

  const handleAddCustomField = useCallback((field: Omit<CustomField, 'id'>) => {
    const newField: CustomField = {
      ...field,
      id: Date.now().toString(),
    };
    setCustomFields(prev => [...prev, newField]);
  }, []);

  const handleRemoveCustomField = useCallback((id: string) => {
    setCustomFields(prev => prev.filter(field => field.id !== id));
  }, []);

  const handleUpdateCustomField = useCallback((id: string, value: string) => {
    setCustomFields(prev =>
      prev.map(field => (field.id === id ? { ...field, value } : field))
    );
  }, []);

  const handleToggleField = useCallback((fieldKey: string) => {
    setFieldVisibility(prev => ({
      ...prev,
      [fieldKey]: !prev[fieldKey]
    }));
  }, []);

  const handleGeneratePDF = async () => {
    if (!biodataData.personal.fullName) {
      alert('Please fill in at least the name before generating PDF');
      return;
    }

    setIsGeneratingPDF(true);
    try {
      const filename = `${biodataData.personal.fullName.replace(/\s+/g, '_')}_Biodata.pdf`;
      await generatePDF('biodata-preview', filename);
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
      console.error('PDF generation error:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-red-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bio Data Generator</h1>
                <p className="text-sm text-gray-600">Indian Biodata Generator</p>
              </div>
            </div>
            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF || !biodataData.personal.fullName}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <BiodataForm
              initialValues={biodataData}
              onSubmit={handleFormSubmit}
              customFields={customFields}
              onAddCustomField={handleAddCustomField}
              onRemoveCustomField={handleRemoveCustomField}
              onUpdateCustomField={handleUpdateCustomField}
              fieldVisibility={fieldVisibility}
              onToggleField={handleToggleField}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Preview</h2>
              <div className="overflow-hidden">
                <BiodataPreview 
                  data={biodataData} 
                  customFields={customFields} 
                  fieldVisibility={fieldVisibility}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-blue-700">
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <p>Use the Field Manager to show/hide fields according to your needs.</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <p>Fill out the biodata form with your personal, family, and contact information.</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <p>Add custom fields like horoscope, hobbies, or any other details you want to include.</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <p>Preview your biodata in real-time and download it as a PDF when ready.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Bio Data Generator</h3>
            <p className="text-gray-400 text-sm">
              Generate beautiful, traditional Indian biodata forms instantly.
              All processing happens in your browser - your data stays private.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              © {new Date().getFullYear()} VM Pvt Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;