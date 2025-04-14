import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const OAuthButton = () => {
  const clientId = '782626810761-bbn40sec9a00nuktu5c52n3mpon7emb9.apps.googleusercontent.com';

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      console.log("ID Token:", credentialResponse.credential);
      const userInfo = jwtDecode(credentialResponse.credential);
      console.log('User Info:', userInfo);
    }

    console.log("OAuth success:", credentialResponse);
    // Позже — отправка токена на backend
  };

  const handleError = () => {
    console.log("OAuth login failed");
  };

  return (
    <div className="flex flex-col items-center my-6">
      <p className="text-sm text-gray-500 mb-2">Или войдите через Google</p>
      <GoogleOAuthProvider clientId={clientId}>
        <div>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default OAuthButton;