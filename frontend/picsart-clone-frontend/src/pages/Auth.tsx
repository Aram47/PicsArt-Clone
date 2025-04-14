import React, { useState } from 'react';
import AuthContainer from '../components/authComponents/AuthContainer';
import AuthForm from '../components/authComponents/AuthForm';
import ToggleForm from '../components/authComponents/ToggleForm';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', isSignUp ? 'SignUp' : 'SignIn');
  };

  return (
    <AuthContainer>
      <AuthForm isSignUp={isSignUp} onSubmit={handleSubmit} />
      <ToggleForm isSignUp={isSignUp} toggleForm={toggleForm} />
    </AuthContainer>
  );
};

export default Auth;