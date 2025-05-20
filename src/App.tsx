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
import DriverTable from './components/Driver/DriverTable';
import MotorcycleTable from './components/Motorcycle/motorcycleTable';
import PhotoTable from './components/Photo/photoTable';
import PhotoForm from './components/Photo/photoForm';
import MotorcycleForm from './components/Motorcycle/MotorcycleForm';
import { PhotoData } from './types/photo.types';
import { MotorcycleData } from './types/Motorcycle.type';
import IssueTable from './components/Issues/IssuesTable';
import ShiftTable from './components/Shift/ShiftTable';
import IssueForm from './components/Issues/issuesForm';
import ShiftForm from './components/Shift/ShiftForm';
import DriverForm from './components/Driver/DriverForm';
import { DriverData } from './types/driver.type';
import { createDriver } from './api/driver.api';
import { createIssue } from './api/Issue.api';
import EditIssuePage from './components/Issues/IssueEdit';
import ShiftCreatePage from './components/Shift/ShiftCreate';
import ShiftEditPage from './components/Shift/shiftEdit';
import DriverEditPage from './components/Driver/DriverEdit';
import MotorcycleEditPage from './components/Motorcycle/MotorcycleEdit';
import { createMotorcycle } from './api/motorcycle.api';
import { createPhoto } from './api/photo.api';
import PedidoNotifier from './components/PedidoNotifier';


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
      <PedidoNotifier />
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
          <Route path="/drivers" element={<DriverTable />} />
          <Route path="/drivers/new" element={
          <DriverForm
            onSubmit={async (data) => {
              await createDriver(data);
              window.location.href = "/drivers"; // or use navigate("/drivers")
            }}
          />
        } />
          <Route path="/drivers/:id/edit" element={<DriverEditPage />} />
          <Route path="/motorcycles" element={<MotorcycleTable />} />
          <Route path="/photos" element={<PhotoTable />} />
          <Route path="/photos/new" element={
          <PhotoForm
            onSubmit={async (data) => {
              // You should have a createPhoto API function
              await createPhoto(data);
              window.location.href = "/photos"; // or use navigate("/photos")
            }}
          />
        } />
          <Route path="/motorcycles/new" element={
          <MotorcycleForm
            onSubmit={async (data) => {
              await createMotorcycle(data);
              window.location.href = "/motorcycles"; // or use navigate("/motorcycles")
            }}
          />
        } />
          <Route path="/motorcycles/:id/edit" element={<MotorcycleEditPage />} />
          <Route path="/shifts" element={<ShiftTable />} />
          <Route path="/issues" element={<IssueTable />} />
          <Route path="/shifts/new" element={<ShiftForm onSubmit={function (data: any): void {
            throw new Error('Function not implemented.');
          } } drivers={[]} motorcycles={[]} />} />
          <Route path="/shifts/:id/edit" element={<ShiftForm onSubmit={function (data: any): void {
            throw new Error('Function not implemented.');
          }} drivers={[]} motorcycles={[]} />} />
          <Route path="/issues/new" element={
          <IssueForm
            onSubmit={async (data) => {
              await createIssue(data);
              window.location.href = "/issues";
            }}
          />
        } />
        <Route path="/issues/:id/edit" element={<EditIssuePage />} />

        <Route path="/shifts/new" element={<ShiftCreatePage />} />
        <Route path="/shifts/:id/edit" element={<ShiftEditPage />} />
          


          {/* Add more routes as needed */}
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
