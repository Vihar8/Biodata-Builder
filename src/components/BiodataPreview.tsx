// import React from 'react';
// import { BiodataData, CustomField, FieldVisibility } from '../types/biodata';
// import { defaultFieldConfigs } from '../utils/fieldConfigs';

// interface BiodataPreviewProps {
//   data: BiodataData;
//   customFields: CustomField[];
//   fieldVisibility: FieldVisibility;
// }

// const BiodataPreview: React.FC<BiodataPreviewProps> = ({ data, customFields, fieldVisibility }) => {
//   const { personal, family, contact } = data;

//   const renderCustomFields = (section: 'personal' | 'family' | 'contact') => {
//     const sectionFields = customFields.filter(field => field.section === section && field.value);
//     if (sectionFields.length === 0) return null;

//     return (
//       <>
//         {sectionFields.map((field) => (
//           <div key={field.id} className="biodata-field">
//             <span className="biodata-label">{field.label}:</span>
//             <span className="biodata-value">{field.value}</span>
//           </div>
//         ))}
//       </>
//     );
//   };

//   const renderFieldValue = (fieldKey: string, value: any, label: string) => {
//     if (!fieldVisibility[fieldKey] || !value) return null;

//     // Special handling for date fields
//     if (fieldKey === 'personal.dateOfBirth' && value) {
//       return (
//         <div className="biodata-field">
//           <span className="biodata-label">{label}:</span>
//           <span className="biodata-value">{new Date(value).toLocaleDateString('en-IN')}</span>
//         </div>
//       );
//     }

//     // Special handling for age field
//     if (fieldKey === 'personal.age' && value) {
//       return (
//         <div className="biodata-field">
//           <span className="biodata-label">{label}:</span>
//           <span className="biodata-value">{value} years</span>
//         </div>
//       );
//     }

//     // Special handling for textarea fields
//     if (fieldKey === 'family.familyValues' || fieldKey === 'contact.address') {
//       return (
//         <div className="biodata-field-full">
//           <span className="biodata-label">{label}:</span>
//           <span className="biodata-value-block">{value}</span>
//         </div>
//       );
//     }

//     return (
//       <div className="biodata-field">
//         <span className="biodata-label">{label}:</span>
//         <span className="biodata-value">{value}</span>
//       </div>
//     );
//   };

//   const getVisiblePersonalFields = () => {
//     const personalFields = defaultFieldConfigs.filter(field => field.section === 'personal');
//     return personalFields.map(field => {
//       const value = field.key.split('.').reduce((obj, key) => obj?.[key], data as any);
//       return renderFieldValue(field.key, value, field.label);
//     }).filter(Boolean);
//   };

//   const getVisibleFamilyFields = () => {
//     const familyFields = defaultFieldConfigs.filter(field => field.section === 'family');
//     return familyFields.map(field => {
//       const value = field.key.split('.').reduce((obj, key) => obj?.[key], data as any);
//       return renderFieldValue(field.key, value, field.label);
//     }).filter(Boolean);
//   };

//   const getVisibleContactFields = () => {
//     const contactFields = defaultFieldConfigs.filter(field => field.section === 'contact');
//     return contactFields.map(field => {
//       const value = field.key.split('.').reduce((obj, key) => obj?.[key], data as any);
//       return renderFieldValue(field.key, value, field.label);
//     }).filter(Boolean);
//   };

//   const hasVisiblePersonalFields = getVisiblePersonalFields().length > 0 || renderCustomFields('personal');
//   const hasVisibleFamilyFields = getVisibleFamilyFields().length > 0 || renderCustomFields('family');
//   const hasVisibleContactFields = getVisibleContactFields().length > 0 || renderCustomFields('contact');

//   return (
//     <div id="biodata-preview" className="biodata-container">
//       {/* Traditional Indian Border with Corner Motifs */}
//       <div className="traditional-border">
//         {/* Corner Motifs */}
//         <div className="corner-motif top-left">
//           <svg viewBox="0 0 60 60" className="motif-svg">
//             <path d="M5 5 Q30 5 55 30 Q30 55 5 55 Q5 30 5 5" fill="none" stroke="currentColor" strokeWidth="2"/>
//             <path d="M10 10 Q25 10 40 25 Q25 40 10 40 Q10 25 10 10" fill="none" stroke="currentColor" strokeWidth="1"/>
//             <circle cx="15" cy="15" r="3" fill="currentColor"/>
//             <circle cx="25" cy="25" r="2" fill="currentColor"/>
//           </svg>
//         </div>
//         <div className="corner-motif top-right">
//           <svg viewBox="0 0 60 60" className="motif-svg">
//             <path d="M55 5 Q30 5 5 30 Q30 55 55 55 Q55 30 55 5" fill="none" stroke="currentColor" strokeWidth="2"/>
//             <path d="M50 10 Q35 10 20 25 Q35 40 50 40 Q50 25 50 10" fill="none" stroke="currentColor" strokeWidth="1"/>
//             <circle cx="45" cy="15" r="3" fill="currentColor"/>
//             <circle cx="35" cy="25" r="2" fill="currentColor"/>
//           </svg>
//         </div>
//         <div className="corner-motif bottom-left">
//           <svg viewBox="0 0 60 60" className="motif-svg">
//             <path d="M5 55 Q30 55 55 30 Q30 5 5 5 Q5 30 5 55" fill="none" stroke="currentColor" strokeWidth="2"/>
//             <path d="M10 50 Q25 50 40 35 Q25 20 10 20 Q10 35 10 50" fill="none" stroke="currentColor" strokeWidth="1"/>
//             <circle cx="15" cy="45" r="3" fill="currentColor"/>
//             <circle cx="25" cy="35" r="2" fill="currentColor"/>
//           </svg>
//         </div>
//         <div className="corner-motif bottom-right">
//           <svg viewBox="0 0 60 60" className="motif-svg">
//             <path d="M55 55 Q30 55 5 30 Q30 5 55 5 Q55 30 55 55" fill="none" stroke="currentColor" strokeWidth="2" />
//             <path d="M50 50 Q35 50 20 35 Q35 20 50 20 Q50 35 50 50" fill="none" stroke="currentColor" strokeWidth="1" />
//             <circle cx="45" cy="45" r="3" fill="currentColor" />
//             <circle cx="35" cy="35" r="2" fill="currentColor" />
//           </svg>
//         </div>
//       </div>

//       <div className="biodata-content">
//         {/* Header with Ganesha and Sacred Text */}
//         <div className="biodata-header">
//           {/* Ganesha Symbol */}
//           <div className="ganesha-container">
//             <div className="flex justify-center mb-4">
//               <div className="w-16 h-16 rounded-full flex items-center justify-center">

//                 <img src='./Ganesh.png' alt='Ganeshdada' />
//               </div>
//             </div>
//           </div>
          
//           {/* Sacred Text */}
//           <div className="sacred-text">
//             <div className="sanskrit-text">|| श्री गणेशाय नमः ||</div>
//             <div className="biodata-title">BIODATA</div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="biodata-main">
//           {/* Photo Section */}
//           <div className="photo-section">
//             {personal.photo ? (
//               <div className="photo-frame">
//                 <img src={personal.photo} alt="Profile" className="profile-photo" />
//               </div>
//             ) : (
//               <div className="photo-placeholder">
//                 <div className="placeholder-text">Photo</div>
//               </div>
//             )}
//           </div>

//           {/* Information Sections */}
//           <div className="info-sections">
//             {/* Personal Information */}
//             {hasVisiblePersonalFields && (
//               <div className="info-section">
//                 <h3 className="section-title">Personal Details</h3>
//                 <div className="section-content">
//                   {getVisiblePersonalFields()}
//                   {renderCustomFields('personal')}
//                 </div>
//               </div>
//             )}

//             {/* Family Information */}
//             {hasVisibleFamilyFields && (
//               <div className="info-section">
//                 <h3 className="section-title">Family Background Details</h3>
//                 <div className="section-content">
//                   {getVisibleFamilyFields()}
//                   {renderCustomFields('family')}
//                 </div>
//               </div>
//             )}

//             {/* Contact Information */}
//             {hasVisibleContactFields && (
//               <div className="info-section">
//                 <h3 className="section-title">Contact Details</h3>
//                 <div className="section-content">
//                   {getVisibleContactFields()}
//                   {renderCustomFields('contact')}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BiodataPreview;


import React from 'react';
import { BiodataData, CustomField, FieldVisibility } from '../types/biodata';
import { defaultFieldConfigs } from '../utils/fieldConfigs';

interface BiodataPreviewProps {
  data: BiodataData;
  customFields: CustomField[];
  fieldVisibility: FieldVisibility;
}

const BiodataPreview: React.FC<BiodataPreviewProps> = ({ data, customFields, fieldVisibility }) => {
  const { personal, family, contact } = data;

  const renderCustomFields = (section: 'personal' | 'family' | 'contact') => {
    const sectionFields = customFields.filter(field => field.section === section && field.value);
    if (sectionFields.length === 0) return null;

    return (
      <>
        {sectionFields.map((field) => (
          <div key={field.id} className="flex flex-wrap mb-1">
            <span className="font-bold min-w-[120px]">{field.label}:</span>
            <span className="ml-2">{field.value}</span>
          </div>
        ))}
      </>
    );
  };

  const renderFieldValue = (fieldKey: string, value: any, label: string) => {
    if (!fieldVisibility[fieldKey] || !value) return null;

    if (fieldKey === 'personal.dateOfBirth') {
      return (
        <div className="flex flex-wrap mb-1">
          <span className="font-bold min-w-[120px]">{label}:</span>
          <span className="ml-2">{new Date(value).toLocaleDateString('en-IN')}</span>
        </div>
      );
    }

    if (fieldKey === 'personal.age') {
      return (
        <div className="flex flex-wrap mb-1">
          <span className="font-bold min-w-[120px]">{label}:</span>
          <span className="ml-2">{value} years</span>
        </div>
      );
    }

    if (fieldKey === 'family.familyValues' || fieldKey === 'contact.address') {
      return (
        <div className="flex mb-1">
          <span className="font-bold min-w-[120px]">{label}:</span>
          <span className="ml-2 whitespace-pre-line">{value}</span>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap mb-1">
        <span className="font-bold min-w-[120px]">{label}:</span>
        <span className="ml-2">{value}</span>
      </div>
    );
  };

  const getVisibleFields = (section: 'personal' | 'family' | 'contact') => {
    return defaultFieldConfigs
      .filter(field => field.section === section)
      .map(field => {
        const value = field.key.split('.').reduce((obj, key) => obj?.[key], data as any);
        return renderFieldValue(field.key, value, field.label);
      })
      .filter(Boolean);
  };

  const hasFields = (section: 'personal' | 'family' | 'contact') => {
    return getVisibleFields(section).length > 0 || renderCustomFields(section);
  };

  return (
    <div
      id="biodata-preview"
      className="relative w-[210mm] h-[297mm] bg-white border-[3px] border-teal-700 rounded-lg p-12 print:w-[210mm] print:h-[297mm] print:m-0 print:p-0 print:shadow-none print:overflow-hidden print:box-border font-serif"
    >
      {/* Corner Motifs */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
        const rotations = {
          'top-left': '',
          'top-right': 'rotate-90',
          'bottom-left': '-rotate-90',
          'bottom-right': 'rotate-180'
        };
        return (
          <div
            key={pos}
            className={`absolute w-10 h-10 text-teal-700 ${
              pos.includes('top') ? 'top-[-2px]' : 'bottom-[-2px]'
            } ${pos.includes('left') ? 'left-[-2px]' : 'right-[-2px]'} ${rotations[pos as keyof typeof rotations]}`}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <path d="M5 5 Q30 5 55 30 Q30 55 5 55 Q5 30 5 5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M10 10 Q25 10 40 25 Q25 40 10 40 Q10 25 10 10" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="15" cy="15" r="3" fill="currentColor" />
              <circle cx="25" cy="25" r="2" fill="currentColor" />
            </svg>
          </div>
        );
      })}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center">
            <img src="./Ganesh.png" alt="Ganeshdada" className="w-16 h-16" />
          </div>
        </div>
        <div className="text-lg font-bold text-teal-700 mt-2">|| श्री गणेशाय नमः ||</div>
        <div className="text-xl font-bold mb-4">BIODATA</div>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Photo */}
        <div className="flex-none border-[3px] border-teal-700 p-1 w-[150px] h-[200px] overflow-hidden">
          {personal.photo ? (
            <img src={personal.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed">
              Photo
            </div>
          )}
        </div>

        {/* Info Sections */}
        <div className="flex flex-col gap-5 flex-grow">
          {/* Personal */}
          {hasFields('personal') && (
            <div className="bg-gray-100 p-4 border-l-4 border-teal-700 rounded">
              <h3 className="text-lg text-teal-700 font-bold mb-2">Personal Details</h3>
              <div>{getVisibleFields('personal')}{renderCustomFields('personal')}</div>
            </div>
          )}

          {/* Family */}
          {hasFields('family') && (
            <div className="bg-gray-100 p-4 border-l-4 border-teal-700 rounded">
              <h3 className="text-lg text-teal-700 font-bold mb-2">Family Background Details</h3>
              <div>{getVisibleFields('family')}{renderCustomFields('family')}</div>
            </div>
          )}

          {/* Contact */}
          {hasFields('contact') && (
            <div className="bg-gray-100 p-4 border-l-4 border-teal-700 rounded">
              <h3 className="text-lg text-teal-700 font-bold mb-2">Contact Details</h3>
              <div>{getVisibleFields('contact')}{renderCustomFields('contact')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiodataPreview;
