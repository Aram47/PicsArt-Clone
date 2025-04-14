import React from 'react';

interface ToggleFormProps {
  isSignUp: boolean;
  toggleForm: () => void;
}

const ToggleForm: React.FC<ToggleFormProps> = ({ isSignUp, toggleForm }) => {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      {isSignUp ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
      <button
        onClick={toggleForm}
        className="text-blue-600 hover:underline focus:outline-none"
      >
        {isSignUp ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </p>
  );
};

export default ToggleForm;