interface ImageUploadProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageUpload({ onImageUpload }: ImageUploadProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="mb-4"
      />
      <p className="text-sm text-gray-500">Загрузите изображение для редактирования</p>
    </div>
  );
}

export default ImageUpload;
