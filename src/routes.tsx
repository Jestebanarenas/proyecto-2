// Este archivo define las rutas de la aplicación utilizando React Router.
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MapOrders from './pages/MapOrders'; // Importa el componente de mapa
import Visualization from './pages/visualization'; // Importa el componente de visualización de datos

import DriverList from './pages/Drivers/DriverList';
import DriverForm from './pages/Drivers/DriverForm';

import IssueList from './pages/Issues/IssueList';
import IssueForm from './pages/Issues/IssueForm';

import MotorcycleList from './pages/Motorcycles/MotorcycleList';
import MotorcycleForm from './pages/Motorcycles/MotorcycleForm';

import OrderList from './pages/Orders/OrderList';
import OrderForm from './pages/Orders/OrderForm';

import PhotoList from './pages/Photos/PhotoList';
import PhotoForm from './pages/Photos/PhotoForm';

import RestaurantList from './pages/Restaurants/RestaurantList';
import RestaurantForm from './pages/Restaurants/RestaurantForm';

import ShiftList from './pages/shifts/ShiftList';
import ShiftForm from './pages/shifts/ShiftForm';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/drivers" replace />} />

    <Route path="drivers">
      <Route index element={<DriverList />} />
      <Route path="new" element={<DriverForm />} />
      <Route path="edit/:id" element={<DriverForm />} />
    </Route>

      <Route path="map" element={<MapOrders />} /> {/* Ruta para el mapa */}
      <Route path="visualization" element={<Visualization />} />

    <Route path="issues">
      <Route index element={<IssueList />} />
      <Route path="new" element={<IssueForm />} />
      <Route path="edit/:id" element={<IssueForm />} />
    </Route>

    <Route path="motorcycles">
      <Route index element={<MotorcycleList />} />
      <Route path="new" element={<MotorcycleForm />} />
      <Route path="edit/:id" element={<MotorcycleForm />} />
    </Route>

    <Route path="orders">
      <Route index element={<OrderList />} />
      <Route path="new" element={<OrderForm />} />
      <Route path="edit/:id" element={<OrderForm />} />
    </Route>

    <Route path="photos">
      <Route index element={<PhotoList />} />
      <Route path="new" element={<PhotoForm />} />
      <Route path="edit/:id" element={<PhotoForm />} />
    </Route>

    <Route path="restaurants">
      <Route index element={<RestaurantList />} />
      <Route path="new" element={<RestaurantForm />} />
      <Route path="edit/:id" element={<RestaurantForm />} />
    </Route>

    <Route path="shifts">
      <Route index element={<ShiftList />} />
      <Route path="new" element={<ShiftForm />} />
      <Route path="edit/:id" element={<ShiftForm />} />
    </Route>

    {/* Redirige cualquier ruta no encontrada a la lista de conductores */}
  </Routes>
);

export default AppRoutes;
