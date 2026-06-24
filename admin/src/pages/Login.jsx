import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {

            if (state === 'Admin') {

                const { data } = await axios.post(
                    `${backendUrl}/api/admin/login`,
                    { email, password }
                );

                if (data.success) {

                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);

                    toast.success('Admin Login Successful');

                } else {
                    toast.error(data.message);
                }

            } else {

                const { data } = await axios.post(
                    `${backendUrl}/api/doctor/login`,
                    { email, password }
                );

                if (data.success) {

                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);

                    toast.success('Doctor Login Successful');

                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4">

            <form
                onSubmit={onSubmitHandler}
                className="w-full max-w-md bg-white border border-gray-100 rounded-2xl p-8"
            >

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src={assets.admin_logo}
                        alt=""
                        className="w-36"
                    />
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {state} Login
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Sign in to continue
                    </p>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#5F6FFF] transition-colors"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#5F6FFF] transition-colors"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-[#5F6FFF] text-white py-3 rounded-xl font-medium hover:bg-[#5263ff] transition-colors"
                >
                    Login
                </button>

                {/* Switch Login */}
                <div className="mt-6 text-center text-sm text-gray-600">

                    {state === 'Admin' ? (
                        <>
                            Doctor Login?{" "}
                            <span
                                onClick={() => setState('Doctor')}
                                className="text-[#5F6FFF] font-medium cursor-pointer"
                            >
                                Click Here
                            </span>
                        </>
                    ) : (
                        <>
                            Admin Login?{" "}
                            <span
                                onClick={() => setState('Admin')}
                                className="text-[#5F6FFF] font-medium cursor-pointer"
                            >
                                Click Here
                            </span>
                        </>
                    )}

                </div>

            </form>

        </div>
    );
};

export default Login;