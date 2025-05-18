import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
