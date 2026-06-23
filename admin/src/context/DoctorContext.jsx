import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(
        localStorage.getItem("dToken") || ""
    );

    const [appointments, setAppointments] = useState([]);

    // ==========================
    // Get Doctor Appointments
    // ==========================
    const getAppointments = async () => {
        try {

            const { data } = await axios.get(
                `${backendUrl}/api/doctor/appointments`,
                {
                    headers: {
                        token: dToken,
                    },
                }
            );

            if (data.success) {
                setAppointments(
                    data.appointments
                );
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // ==========================
    // Complete Appointment
    // ==========================
    const completeAppointment = async (
        appointmentId
    ) => {
        try {

            const { data } = await axios.post(
                `${backendUrl}/api/doctor/complete-appointment`,
                { appointmentId },
                {
                    headers: {
                        token: dToken,
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // ==========================
    // Cancel Appointment
    // ==========================
    const cancelAppointment = async (
        appointmentId
    ) => {
        try {

            const { data } = await axios.post(
                `${backendUrl}/api/doctor/cancel-appointment`,
                { appointmentId },
                {
                    headers: {
                        token: dToken,
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        backendUrl,

        dToken,
        setDToken,

        appointments,
        setAppointments,

        getAppointments,
        completeAppointment,
        cancelAppointment,
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;