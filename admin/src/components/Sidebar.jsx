import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 py-3 px-5 cursor-pointer transition-colors ${
            isActive
                ? 'bg-[#F2F3FF] border-r-[3px] border-[#5F6FFF] text-[#5F6FFF]'
                : 'text-[#515151] hover:bg-gray-50'
        }`;

    return aToken && (
        <div
            className="min-h-screen bg-white w-64"
            style={{ boxShadow: '1px 0 0 rgba(0,0,0,0.06)' }}
        >
            <ul className="mt-5">
                <NavLink to="/admin-dashboard" className={linkClass}>
                    <img className="w-5 h-5" src={assets.home_icon} alt="" />
                    <p className="hidden md:block">Dashboard</p>
                </NavLink>

                <NavLink to="/all-appointments" className={linkClass}>
                    <img className="w-5 h-5" src={assets.appointment_icon} alt="" />
                    <p className="hidden md:block">Appointments</p>
                </NavLink>

                <NavLink to="/add-doctor" className={linkClass}>
                    <img className="w-5 h-5" src={assets.add_icon} alt="" />
                    <p className="hidden md:block">Add Doctor</p>
                </NavLink>

                <NavLink to="/doctor-list" className={linkClass}>
                    <img className="w-5 h-5" src={assets.people_icon} alt="" />
                    <p className="hidden md:block">Doctors List</p>
                </NavLink>
            </ul>
        </div>
    );
};

export default Sidebar;