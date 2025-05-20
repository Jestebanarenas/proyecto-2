// src/App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerTable from './components/customers/CustomerTable';
import MainPage from './pages/Main';
import RestaurantTable from './components/Restaurant/RestaurantTable';
import MenuTable from './components/Menu/MenuTable';
import './App.css';
import AddressTable from './components/Address/AddressTable';
import ProductTable from './components/Product/ProductTable';
import OrderPage from './components/order/OrderPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/LoginPage';
import Header from './components/common/Header';
import OrdersByCustomerPage from './pages/OrdersByCustomer';
import StatsDashboard from './pages/Graphics';
import Chatbot from './components/bot/Chatbot';
import PedidoNotifier from './components/PedidoNotifier';
//import DriverTable from './components/Driver/DriverTable';
//import MotorcycleTable from './components/motorcycles/motorcycleTable';
//import PhotoTable from './components/Photo/photoTable';
//import PhotoForm from './components/Photo/photoForm';
//import MotorcycleForm from './components/motorcycles/MotorcycleForm';
//import { PhotoData } from './types/photo.types';
//mport { MotorcycleData } from './types/Motorcycle.type';
//import IssueTable from './components/Issues/IssuesTable';


const App = () => {
  React.useEffect(() => {
    const token = localStorage.getItem('google_token');
    if (token) {
      console.log('Google Token:', token);
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId="186352635832-f80sq0qqvi2rctaabiajaap4u6p0qv8k.apps.googleusercontent.com">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/customers" element={<CustomerTable />} />
          <Route path="/adresses" element={<AddressTable/>} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/restaurants" element={<RestaurantTable />} />
          <Route path="/restaurants/:restaurantId/menu" element={<MenuTable />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/new" element={<OrderPage />} />
          <Route path="/orders/by-customer" element={<OrdersByCustomerPage />} />
          <Route path="/stats" element={<StatsDashboard />} />
          <Route path="/pedido-notifier" element={<PedidoNotifier pedidos={[]} />} />
          {/* Add more routes as needed */}
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
