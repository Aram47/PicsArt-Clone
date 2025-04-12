import { useState } from "react";
import { Link } from "react-router-dom";

function Editor() {
  const [image, setImage] = useState<string | null>(null); // Для хранения загруженного изображения
  const [isEditing, setIsEditing] = useState(false); // Статус редактирования

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Сохранение изображения или отправка на сервер
    alert("Изображение сохранено!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Редактор изображения</h2>

        {/* Кнопка для загрузки изображения */}
        {!isEditing && (
          <div className="flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
            <p className="text-sm text-gray-500">Загрузите изображение для редактирования</p>
          </div>
        )}

        {/* Если изображение загружено, показываем его */}
        {isEditing && (
          <div className="relative">
            <img src={image!} alt="Uploaded" className="w-full h-auto rounded-lg" />
            <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
              {/* Добавьте сюда кнопки для редактирования */}
              <button
                onClick={() => alert("Фильтр добавлен")}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Фильтр
              </button>
            </div>
          </div>
        )}

        {/* Кнопки для сохранения или отмены */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSave}
            className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Сохранить
          </button>
          <Link
            to="/editor"
            className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Отменить
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Editor;
