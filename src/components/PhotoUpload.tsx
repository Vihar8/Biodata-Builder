import React, { useRef } from 'react';
import { Camera, X } from 'lucide-react';

interface PhotoUploadProps {
  photo: string | undefined;
  onPhotoChange: (photo: string | undefined) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photo, onPhotoChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    onPhotoChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Photo</label>
      
      {photo ? (
        <div className="relative inline-block">
          <img
            src={photo}
            alt="Preview"
            className="w-32 h-40 object-cover border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={removePhoto}
            className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors"
        >
          <Camera className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 text-center">Click to upload photo</span>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-xs text-gray-500">Max file size: 5MB</p>
    </div>
  );
};

export default PhotoUpload;