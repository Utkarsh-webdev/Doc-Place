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
        <div
            className="flex items-center justify-between px-6 bg-white"
            style={{ height: '56px', boxShadow: '0 1px 0 rgba(0,0,0,0.06)' }}
        >
            <div className="flex items-center gap-3">
                <img
                    className="w-36"
                    src={assets.admin_logo}
                    alt="Admin Logo"
                />
                <p className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs">
                    Admin
                </p>
            </div>

            {aToken && (
                <button
                    onClick={logout}
                    className="bg-[#5F6FFF] hover:bg-[#4F5DF4] text-white text-sm px-8 py-2 rounded-full transition-all duration-300"
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;