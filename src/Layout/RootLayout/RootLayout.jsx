import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='px-5xl'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;