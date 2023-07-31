import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.scss';

import Dispatcher from './pages/Dispatcher/Dispatcher';
import Barman from './pages/Barman/Barman';
import { routes } from './helpers/routes';
import Login from './pages/Login/Login';
import DriverContainer from './pages/Driver/Driver';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.dispatcher} element={<Dispatcher />} />
        <Route path={routes.barman} element={<Barman />} />
        <Route path={routes.driver} element={<DriverContainer />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
