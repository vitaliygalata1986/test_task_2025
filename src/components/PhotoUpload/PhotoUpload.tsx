import type { PhotoUploadProps } from './PhotoUpload.props';

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onChange,
  photo,
  error,
}) => {
  const leftBorder = error
    ? 'border-[var(--border-input-invalid)] border-2'
    : 'border-[var(--text-black-color)]';

  const rightBorder = error
    ? 'border-[var(--border-input-invalid)] border-2'
    : 'border-[var(--border-input-enabled)]';

  const textColor = photo
    ? 'text-[var(--text-black-color)]'
    : 'text-[var(--text-input-color)]';

  return (
    <>
      <div className="flex rounded-[4px] overflow-hidden">
        <label
          className={`
            flex items-center px-4 py-3.5 cursor-pointer text-base
            border rounded-l-[4px]
            text-[var(--text-black-color)] bg-transparent
            ${leftBorder} 
          `}
        >
          Upload
          <input
            name="photo"
            type="file"
            accept="image/jpeg,image/jpg"
            required
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
        </label>
        <input
          type="text"
          disabled
          value={photo ? photo.name : 'Upload your photo'}
          className={`
            px-4 py-3.5 text-base w-full bg-transparent border border-l-0 rounded-r-[4px] 
            ${rightBorder} ${textColor}
          `}
        />
      </div>

      {error && (
        <p className="text-[var(--border-input-invalid)] text-sm mt-1 pl-4">
          {error}
        </p>
      )}
    </>
  );
};
