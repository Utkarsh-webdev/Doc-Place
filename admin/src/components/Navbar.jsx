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
        <div className='sticky top-0 z-50 bg-white border-b border-gray-100'>

            <div className='flex items-center justify-between px-6 sm:px-10 py-4'>

                {/* Logo & Role */}
                <div className='flex items-center gap-4'>

                    <img
                        className='w-36 sm:w-40 cursor-pointer'
                        src={assets.admin_logo}
                        alt="Logo"
                    />

                    <span className='hidden sm:flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-600 border border-gray-200'>
                        {aToken ? 'Admin Panel' : 'Doctor Panel'}
                    </span>

                </div>

                {/* Logout */}
                <button
                    onClick={logout}
                    className='px-5 py-2 text-sm font-medium text-white bg-[#5F6FFF] rounded-full hover:bg-[#5263ff] transition-colors'
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default Navbar;