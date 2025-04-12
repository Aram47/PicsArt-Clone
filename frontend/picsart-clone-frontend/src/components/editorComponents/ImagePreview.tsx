interface ImagePreviewProps {
  image: string;
}

function ImagePreview({ image }: ImagePreviewProps) {
  return (
    <div className="relative mt-4">
      <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg" />
      <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
        <button
          onClick={() => alert("Фильтр добавлен")}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Фильтр
        </button>
      </div>
    </div>
  );
}

export default ImagePreview;
