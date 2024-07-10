import { useState } from 'react';

interface ImageUploadProps {
  onChange: (value: string[] | string) => void;
  value: string[] | string;
  label?: string;
  multiple?: boolean;
  setLoading: (loading: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, label, multiple = false, setLoading }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    setLoading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file);
    });

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setUploading(false);
    setLoading(false);

    if (response.ok) {
      const uploadedFiles = data.files.map((file: any) => `/uploads/${file.newFilename}`);
      onChange(multiple ? uploadedFiles : uploadedFiles[0]);
    } else {
      console.error('Upload failed:', data.error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <div className="font-semibold text-lg">{label}</div>}
      <input
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
