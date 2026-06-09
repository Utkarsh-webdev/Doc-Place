import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('aToken');
        setAToken('');
        navigate('/');
    };

    return (
        <div className="flex items-center justify-between px-6 py-3 border-b bg-white">

            <div className="flex items-center gap-3">
                <img
                    className="w-36"
                    src={assets.admin_logo}
                    alt="Admin Logo"
                />

                <p className="border border-gray-300 px-3 py-1 rounded-full text-xs text-gray-600">
                    Admin
                </p>
            </div>

            {aToken && (
                <button
                    onClick={logout}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-8 py-2 rounded-full transition-all duration-300"
                >
                    Logout
                </button>
            )}

        </div>
    );
};

export default Navbar;