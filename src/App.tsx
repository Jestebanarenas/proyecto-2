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
import Header from './components/common/Header';
import DriverTable from './components/Driver/DriverTable';


const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/customers" element={<CustomerTable />} />
        <Route path="/adresses" element={<AddressTable/>} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/restaurants" element={<RestaurantTable />} />
        <Route path="/restaurants/:restaurantId/menu" element={<MenuTable />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/orders/new" element={<OrderPage />} />
        <Route path="/drivers" element={<DriverTable />} />
        
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
