import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [images, setImages] = useState<string[]>([]); // Состояние для хранения изображений
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Проверка авторизации

  useEffect(() => {
    // Проверка на авторизацию, например, через токен в localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }

    // Загрузка изображений (в будущем здесь может быть запрос к серверу)
    fetchImages();
  }, []);

  const fetchImages = async () => {
    // Здесь можно заменить на реальный запрос к API
    const fetchedImages = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ];
    setImages(fetchedImages);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-center text-lg">Пожалуйста, войдите в систему, чтобы продолжить.</p>
          <Link
            to="/login"
            className="mt-4 text-blue-500 hover:text-blue-700"
          >
            Перейти на страницу входа
          </Link>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Добро пожаловать в PicsArt</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={image} alt={`Image ${index}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Применить фильтр
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/upload"
              className="w-full bg-green-500 text-white py-2 rounded-lg text-center block hover:bg-green-600 transition"
            >
              Загрузить новое изображение
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
