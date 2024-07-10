'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

interface ImageUploadProps {
  onChange: (value: string[] | string) => void;
  value: string[] | string;
  label?: string;
  multiple?: boolean;
  setLoading: (loading: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, label, multiple = false, setLoading }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const files = Array.from(inputFileRef.current.files);
    const uploadedFiles: string[] = [];

    setUploading(true);
    setLoading(true);

    try {
      for (const file of files) {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: 'POST',
          body: file,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const newBlob = (await response.json()) as PutBlobResult;
        uploadedFiles.push(newBlob.url);
      }

      onChange(multiple ? uploadedFiles : uploadedFiles[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <div className="font-semibold text-lg">{label}</div>}
      <input
        ref={inputFileRef}
        type="file"
        multiple={multiple}
        onChange={handleUpload}
        disabled={uploading}
        className="cursor-pointer border-dashed border-2 p-4 border-neutral-300 text-neutral-600"
      />
      {uploading && <div>Uploading...</div>}
      {Array.isArray(value) ? (
        value.map((val, index) => (
          <div key={index} className="relative w-full h-40 mt-4">
            <img src={val} alt={`Uploaded image ${index + 1}`} className="object-cover h-full w-full" />
          </div>
        ))
      ) : (
        value && (
          <div className="relative w-full h-40 mt-4">
            <img src={value} alt="Uploaded image" className="object-cover h-full w-full" />
          </div>
        )
      )}
    </div>
  );
};

export default ImageUpload;
