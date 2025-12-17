import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router'; 
import router from './router/router.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import AuthProvider from './Providers/Authprovider.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const queryClient = new QueryClient();

AOS.init({
  duration: 1000, 
  once: true,      
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);