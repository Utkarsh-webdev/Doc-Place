import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = () => {

        if (aToken) {
            localStorage.removeItem('aToken');
            setAToken('');
        }

        if (dToken) {
            localStorage.removeItem('dToken');
            setDToken('');
        }

        navigate('/');
    };

    return (
        <div className='flex items-center justify-between px-6 sm:px-10 py-4 bg-white shadow-sm sticky top-0 z-50'>

            <div className='flex items-center gap-4'>

                <img
                    className='w-36 sm:w-40 cursor-pointer transition-transform duration-300 hover:scale-105'
                    src={assets.admin_logo}
                    alt="Logo"
                />

                <span className='px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-[#5F6FFF] border border-indigo-100'>
                    {aToken ? 'Admin Panel' : 'Doctor Panel'}
                </span>

            </div>

            <button
                onClick={logout}
                className='bg-[#5F6FFF] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#4d5cff] hover:shadow-md transition-all duration-300'
            >
                Logout
            </button>

        </div>
    );
};

export default Navbar;