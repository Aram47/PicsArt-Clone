import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleUserInfo {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

const GoogleOAuthButton: React.FC = () => {
  const clientId = '782626810761-bbn40sec9a00nuktu5c52n3mpon7emb9.apps.googleusercontent.com';

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const userInfo = jwtDecode<GoogleUserInfo>(credentialResponse.credential);
      console.log('ID Token:', credentialResponse.credential);
      console.log('User Info:', userInfo);
    }
    console.log('OAuth success:', credentialResponse);
    // We will send to backend
  };

  const handleError = () => {
    console.log('OAuth login failed');
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <p className="text-sm text-gray-500 mb-2">Или войдите через Google</p>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleOAuthButton;