export interface PhotoUploadProps {
  onChange: (file: File | null) => void;
  photo: File | null;
  error?: string;
}
