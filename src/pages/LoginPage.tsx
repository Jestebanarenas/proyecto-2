import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
  const handleSuccess = (credentialResponse: any) => {
    localStorage.setItem('google_token', credentialResponse.credential);

    // Decode JWT to get user info
    const base64Url = credentialResponse.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const user = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    localStorage.setItem('google_user', JSON.stringify(user));

    window.location.href = '/'; // Redirect after login
  };

  const handleError = () => {
    alert('Login Failed');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default LoginPage;