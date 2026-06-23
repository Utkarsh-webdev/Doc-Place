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
        <div className='flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white'>

            <div className='flex items-center gap-3 text-xs'>

                <img
                    className='w-36 sm:w-40 cursor-pointer'
                    src={assets.admin_logo}
                    alt=""
                />

                <p className='border px-2.5 py-0.5 rounded-full border-gray-300 text-gray-600'>
                    {aToken ? 'Admin' : 'Doctor'}
                </p>

            </div>

            <button
                onClick={logout}
                className='bg-[#5F6FFF] text-white text-sm px-8 py-2 rounded-full hover:bg-[#4d5cff] transition-all'
            >
                Logout
            </button>

        </div>
    );
};

export default Navbar;