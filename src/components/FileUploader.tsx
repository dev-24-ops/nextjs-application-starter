import React, { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  accept?: string[];
  selectedFile?: File | null;
}

export function FileUploader({ onFileChange, accept = ['.txt'], selectedFile }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) {
        onFileChange(file);
      }
    },
    [onFileChange]
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  return (
    <Card
      className={`relative p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
        ${isDragging || selectedFile ? 'border-primary bg-primary/5' : 'hover:border-primary border-gray-300'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept={accept.join(',')}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src="/file.svg"
          alt="Upload file"
          width={48}
          height={48}
          className={`transition-opacity duration-200 ${selectedFile ? 'opacity-100' : 'opacity-50'}`}
        />
        <div className="text-center">
          {selectedFile ? (
            <>
              <p className="text-primary font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500 mt-1">Click or drag to replace</p>
            </>
          ) : (
            <>
              <p className="font-medium">
                {isDragging ? 'Drop your file here' : 'Drag & drop a file here, or click to select'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supported files: {accept.join(', ')}
              </p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
