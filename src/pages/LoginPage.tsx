import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GITHUB_CLIENT_ID = 'Ov23liiR619Hw3omiBLG';
const GITHUB_CLIENT_SECRET = 'TU_CLIENT_SECRET'; // Peligroso en frontend, solo para pruebas
const REDIRECT_URI = 'http://localhost:3000';

const MICROSOFT_CLIENT_ID = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';
const MICROSOFT_REDIRECT_URI = 'http://localhost:3000';

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

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const githubCode = params.get('code');
    if (githubCode) {
      // Intercambiar el code por el token (solo para pruebas, no seguro)
      fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: githubCode,
          redirect_uri: REDIRECT_URI,
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log('GitHub Token:', data.access_token);
        });
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <h2>Iniciar sesión</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      <hr style={{ width: '100%', margin: '20px 0' }} />
      <button
        onClick={handleGithubLogin}
        style={{
          background: '#24292e',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 5,
          cursor: 'pointer',
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Iniciar sesión con GitHub
      </button>
      <button
        onClick={handleMicrosoftLogin}
        style={{
          background: '#2F2F2F',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 5,
          cursor: 'pointer',
          fontSize: 16,
        }}
      >
        Iniciar sesión con Microsoft
      </button>
    </div>
  );
};

export default LoginPage;