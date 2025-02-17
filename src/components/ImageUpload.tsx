
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "./ui/card";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif"];

export function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error("Invalid file type. Please upload a JPEG, PNG, or GIF.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onImageSelect(file);
      toast.success("Image uploaded successfully!");
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    multiple: false,
  });

  return (
    <Card
      {...getRootProps()}
      className={`relative h-[300px] w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          {isDragActive ? (
            <>
              <Upload className="h-12 w-12 animate-bounce text-primary" />
              <p className="text-lg font-medium">Drop the image here</p>
            </>
          ) : (
            <>
              <ImageIcon className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium">
                  Drag & drop an image here, or click to select
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Supports JPEG, PNG, and GIF (max 5MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
}
