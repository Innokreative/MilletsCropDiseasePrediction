import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    // Update preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFileName(file.name);
    onImageSelected(file);
  }, [onImageSelected]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const clearImage = useCallback(() => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-emerald-800">Upload Crop Image</h2>
        <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
          <Camera className="h-3 w-3 mr-1" />
          <span>High resolution preferred</span>
        </div>
      </div>

      {!preview ? (
        <div
          className={`border-3 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50/50'
          } shadow-sm`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-teal-500 rounded-full blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-br from-emerald-100 to-emerald-200 h-20 w-20 rounded-full flex items-center justify-center shadow-inner border border-emerald-300">
                <Upload className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
            <p className="text-lg font-medium text-emerald-700 mb-1">
              Analyze Your Millet Crop
            </p>
            <p className="text-sm text-emerald-600 mb-6">
              Drag and drop your image here or click to browse
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-emerald-700 mb-4">
              <span className="bg-emerald-100 px-2 py-1 rounded-full">JPG</span>
              <span className="bg-emerald-100 px-2 py-1 rounded-full">PNG</span>
              <span className="bg-emerald-100 px-2 py-1 rounded-full">WEBP</span>
              <span className="bg-emerald-100 px-2 py-1 rounded-full">Max 10MB</span>
            </div>
            <button
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Camera className="h-4 w-4" />
              Select Image
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative border rounded-xl overflow-hidden bg-white shadow-md">
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={clearImage}
              disabled={isProcessing}
              className={`p-2 rounded-full bg-white/90 hover:bg-white shadow-md ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          <div className="relative aspect-[16/9] bg-gradient-to-br from-emerald-50 to-teal-50">
            <img
              src={preview}
              alt="Crop preview"
              className="w-full h-full object-contain"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white/90 p-4 rounded-xl shadow-lg">
                  <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full mb-3 mx-auto"></div>
                  <p className="text-emerald-800 font-medium">Analyzing image...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ImageIcon className="h-4 w-4 mr-2 text-emerald-600" />
                <span className="text-sm text-emerald-800 truncate">{fileName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">
                  {isProcessing ? 'Processing...' : 'Uploaded'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;