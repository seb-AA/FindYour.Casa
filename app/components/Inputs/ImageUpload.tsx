"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[] | string) => void;
  value: string[] | string;
  label?: string;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, label, multiple = false }) => {
  const handleUpload = useCallback(
    (result: any) => {
      if (multiple) {
        onChange([...((value as string[]) || []), result.info.secure_url]);
      } else {
        onChange(result.info.secure_url);
      }
    },
    [onChange, multiple, value]
  );

  return (
    <div className="flex flex-col gap-2">
      {label && <div className="font-semibold text-lg">{label}</div>}
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="FYC_TEST"
        options={{
          maxFiles: multiple ? undefined : 1,
          styles: {
            palette: {
              window: "#F5F5F5",
              sourceBg: "#FFFFFF",
              windowBorder: "#90a0b3",
              tabIcon: "#69778A",
              inactiveTabIcon: "#69778A",
              menuIcons: "#69778A",
              link: "#F43F5E",
              action: "#8F5DA5",
              inProgress: "#0194c7",
              complete: "#53ad9d",
              error: "#c43737",
              textDark: "#90A0B3",
              textLight: "#FFFFFF",
            },
            frame: {
              background: "#67676700",
            },
          },
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => (open ? open() : {})}
              className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed
                border-2
                p-20
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600
              "
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Click to upload a photo</div>
              {Array.isArray(value) ? (
                value.map((val, index) => (
                  <div key={index} className="relative w-full h-40 mt-4">
                    <Image
                      alt={`Uploaded image ${index + 1}`}
                      fill
                      sizes="100%"
                      style={{ objectFit: "cover" }}
                      src={val}
                    />
                  </div>
                ))
              ) : (
                value && (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      alt="Uploaded image"
                      fill
                      sizes="100%"
                      style={{ objectFit: "cover" }}
                      src={value}
                    />
                  </div>
                )
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
