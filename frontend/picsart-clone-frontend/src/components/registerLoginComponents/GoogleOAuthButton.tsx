import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const OAuthButton = () => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      console.log("ID Token:", credentialResponse.credential);
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
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default OAuthButton;