import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GITHUB_CLIENT_ID = 'Ov23liiR619Hw3omiBLG';
const GITHUB_CLIENT_SECRET = 'TU_CLIENT_SECRET'; // Peligroso en frontend, solo para pruebas
const REDIRECT_URI = 'http://localhost:3000';

const MICROSOFT_CLIENT_ID = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';
const MICROSOFT_REDIRECT_URI = 'http://localhost:3000';

// Iconos SVG
const githubIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" fill="#24292e"/>
  </svg>
);

const microsoftIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <rect x="2" y="2" width="9" height="9" fill="#f35325"/>
    <rect x="13" y="2" width="9" height="9" fill="#81bc06"/>
    <rect x="2" y="13" width="9" height="9" fill="#05a6f0"/>
    <rect x="13" y="13" width="9" height="9" fill="#ffba08"/>
  </svg>
);

const LoginPage: React.FC = () => {
  const handleSuccess = (credentialResponse: any) => {
    localStorage.setItem('google_token', credentialResponse.credential);
    console.log('Google Token:', credentialResponse.credential);
    window.location.href = '/';
  };

  const handleError = () => {
    alert('Login Failed');
  };

  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=user:email`;
    window.open(
      githubAuthUrl,
      '_blank',
      'width=500,height=700'
    );
  };

  const handleMicrosoftLogin = () => {
    const microsoftAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      MICROSOFT_REDIRECT_URI
    )}&response_mode=query&scope=openid%20profile%20email%20User.Read`;
    window.open(
      microsoftAuthUrl,
      '_blank',
      'width=500,height=700'
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <h2>Iniciar sesión</h2>
      <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: '100%' }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            width="100%"
            text="signin_with"
            shape="rectangular"
            theme="outline"
            size="large"
          />
        </div>
        <button
          onClick={handleGithubLogin}
          style={{
            background: '#fff',
            color: '#24292e',
            border: '1px solid #dadce0',
            padding: '0 0',
            borderRadius: 5,
            cursor: 'pointer',
            fontSize: 16,
            width: '100%',
            fontWeight: 500,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center'
          }}
        >
          {githubIcon}
          Iniciar sesión con GitHub
        </button>
        <button
          onClick={handleMicrosoftLogin}
          style={{
            background: '#fff',
            color: '#2F2F2F',
            border: '1px solid #dadce0',
            padding: '0 0',
            borderRadius: 5,
            cursor: 'pointer',
            fontSize: 16,
            width: '100%',
            fontWeight: 500,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center'
          }}
        >
          {microsoftIcon}
          Iniciar sesión con Microsoft
        </button>
      </div>
    </div>
  );
};

export default LoginPage;