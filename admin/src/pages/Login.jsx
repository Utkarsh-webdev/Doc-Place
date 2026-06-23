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

            // Admin Login
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

            }

            // Doctor Login
            else {

                const { data } = await axios.post(
                    `${backendUrl}/api/doctor/login`,
                    { email, password }
                );

                if (data.success) {

                    localStorage.setItem('dToken', data.token);

                    // VERY IMPORTANT
                    setDToken(data.token);

                    toast.success('Doctor Login Successful');

                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="min-h-screen flex items-center justify-center bg-gray-50"
        >
            <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white">

                <div className="w-full flex justify-center mb-2">
                    <img
                        className="w-32"
                        src={assets.admin_logo}
                        alt=""
                    />
                </div>

                <p className="text-2xl font-semibold m-auto">
                    <span className="text-blue-600">
                        {state}
                    </span>{" "}
                    Login
                </p>

                <div className="w-full">
                    <p>Email</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="email"
                        placeholder="Enter Email"
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="password"
                        placeholder="Enter Password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md transition-all"
                >
                    Login
                </button>

                {state === 'Admin' ? (
                    <p>
                        Doctor Login?{' '}
                        <span
                            onClick={() => setState('Doctor')}
                            className="text-blue-600 cursor-pointer"
                        >
                            Click Here
                        </span>
                    </p>
                ) : (
                    <p>
                        Admin Login?{' '}
                        <span
                            onClick={() => setState('Admin')}
                            className="text-blue-600 cursor-pointer"
                        >
                            Click Here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;