import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router'; 
import router from './router/router.jsx';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import AuthProvider from './Providers/Authprovider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>,
);