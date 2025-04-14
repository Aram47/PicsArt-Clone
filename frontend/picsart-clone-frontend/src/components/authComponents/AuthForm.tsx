import React from 'react';
import InputField from './InputField';
import GoogleOAuthButton from './GoogleOAuthButton';

interface AuthFormProps {
  isSignUp: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp, onSubmit }) => {
  const fields = [
    {
      id: 'username',
      label: 'Имя пользователя',
      type: 'text',
      placeholder: 'Ваше имя пользователя',
      required: true,
    },
    ...(isSignUp
      ? [
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Ваш email',
            required: true,
          },
        ]
      : []),
    {
      id: 'password',
      label: 'Пароль',
      type: 'password',
      placeholder: 'Ваш пароль',
      required: true,
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isSignUp ? 'Регистрация' : 'Вход'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field) => (
          <InputField
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSignUp ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      <GoogleOAuthButton />
    </>
  );
};

export default AuthForm;