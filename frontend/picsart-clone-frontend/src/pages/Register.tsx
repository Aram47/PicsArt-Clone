import { useState } from "react";
import OAuthButton from "../components/OAuthButton";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formFields = [
    { name: "username", type: "text", placeholder: "Имя пользователя" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Пароль" },
  ];

  

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Здесь можно отправить данные на сервер
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Регистрация успешна!");
      } else {
        alert("Ошибка: " + data.message);
      }
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Создать аккаунт</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => (
            <InputField
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
            />
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="my-4">
          <hr className="border-t my-4" />
          <p className="text-center text-gray-500 text-sm">или</p>
        </div>

        <OAuthButton />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Войти в аккаунт
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Register;