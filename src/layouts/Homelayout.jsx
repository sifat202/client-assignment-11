import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar';
import Footer from '../Pages/shared/Footer';


const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      
      <header className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md'>
        <Navbar/>
      </header>
      
      <main className="flex-grow pt-16 pb-16">
        <div className="container mx-auto px-4">
          <Outlet/>
        </div>
      </main>
      
      <footer className='fixed bottom-0 left-0 right-0 z-50 bg-gray-100 shadow-inner'>
        <Footer/>
      </footer>
      
    </div>
  );
};

export default HomeLayout;