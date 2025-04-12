import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/registerLoginComponents/AuthForm";
import AuthWrapper from "../components/registerLoginComponents/AuthWrapper";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formFields = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Пароль" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await response.json()) as { message?: string };
      if (response.ok) {
        alert("Регистрация успешна!");
      } else {
        alert("Ошибка: " + (data.message ?? "Неизвестная ошибка"));
      }
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
    }
  };

  return (
    <AuthWrapper
      title="Войти в аккаунт"
      bottomText={
        <p className="text-sm text-gray-500">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Зарегистрироваться
          </Link>
        </p>
      }
    >
      <AuthForm
        formFields={formFields}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitButtonText="Войти"
      />
    </AuthWrapper>
  );
}

export default Login;
