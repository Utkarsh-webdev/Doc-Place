import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';

const Sidebar = () => {

    const { aToken } = useContext(AdminContext);

    return aToken && (
        <div className="min-h-screen bg-white border-r w-64">
            <ul className="mt-5 text-[#515151]">

                <NavLink
                    to="/admin-dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-5 cursor-pointer ${
                            isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-blue-600'
                                : ''
                        }`
                    }
                >
                    <img
                        className="w-5 h-5"
                        src={assets.home_icon}
                        alt=""
                    />
                    <p className="hidden md:block">Dashboard</p>
                </NavLink>

                <NavLink
                    to="/all-appointments"
                    className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-5 cursor-pointer ${
                            isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-blue-600'
                                : ''
                        }`
                    }
                >
                    <img
                        className="w-5 h-5"
                        src={assets.appointment_icon}
                        alt=""
                    />
                    <p className="hidden md:block">Appointments</p>
                </NavLink>

                <NavLink
                    to="/add-doctor"
                    className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-5 cursor-pointer ${
                            isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-blue-600'
                                : ''
                        }`
                    }
                >
                    <img
                        className="w-5 h-5"
                        src={assets.add_icon}
                        alt=""
                    />
                    <p className="hidden md:block">Add Doctor</p>
                </NavLink>

                <NavLink
                    to="/doctor-list"
                    className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-5 cursor-pointer ${
                            isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-blue-600'
                                : ''
                        }`
                    }
                >
                    <img
                        className="w-5 h-5"
                        src={assets.people_icon}
                        alt=""
                    />
                    <p className="hidden md:block">Doctors List</p>
                </NavLink>

            </ul>
        </div>
    );
};

export default Sidebar;