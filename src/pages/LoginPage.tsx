import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GITHUB_CLIENT_ID = 'Ov23liiR619Hw3omiBLG'; // Reemplaza con tu Client ID real
const REDIRECT_URI = 'http://localhost:3000'; // Cambia según tu configuración

const LoginPage: React.FC = () => {
  const handleSuccess = (credentialResponse: any) => {
    localStorage.setItem('google_token', credentialResponse.credential);
    console.log('Google Token:', credentialResponse.credential);
    window.location.href = '/'; // Redirect after login
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

  React.useEffect(() => {
    // Detectar si hay un code de GitHub en la URL
    const params = new URLSearchParams(window.location.search);
    const githubCode = params.get('code');
    if (githubCode) {
      console.log('GitHub code:', githubCode);
      // Aquí normalmente enviarías el code a tu backend para obtener el token
    }

    const token = localStorage.getItem('google_token');
    if (token) {
      console.log('Google Token:', token);
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
        }}
      >
        Iniciar sesión con GitHub
      </button>
    </div>
  );
};

export default LoginPage;