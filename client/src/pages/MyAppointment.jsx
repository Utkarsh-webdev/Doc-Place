import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const {
    backendUrl,
    token,
    getDoctorsData,
    currency,
  } = useContext(AppContext); // ✅ removed slotDateFormat from here

  const [appointments, setAppointments] = useState([]);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
  };

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments`,
        { headers: { token } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "DocPlace",
      description: "Appointment Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razorpay`,
            {
              appointmentId: order.receipt,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers: { token } }
          );

          if (data.success) {
            toast.success("Payment Successful");
            getUserAppointments();
            navigate("/my-appointments");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-500 mt-2">
          View and manage your upcoming appointments
        </p>
      </div>

      <div className="space-y-5">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex justify-center md:justify-start">
                <img
                  className="w-32 h-32 object-cover rounded-2xl bg-indigo-50"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              <div className="flex-1 text-sm text-zinc-600">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.docData.name}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.cancelled
                        ? "bg-red-100 text-red-600"
                        : item.payment
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.cancelled
                      ? "Cancelled"
                      : item.payment
                      ? "Paid"
                      : "Pending"}
                  </span>
                </div>

                <p className="text-blue-600 font-medium mt-1">
                  {item.docData.speciality}
                </p>

                <div className="mt-4">
                  <p className="font-semibold text-gray-700">Address</p>
                  <p>{item.docData.address?.line1}</p>
                  <p>{item.docData.address?.line2}</p>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-700">Date & Time</p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="font-semibold text-gray-700">
                    Consultation Fee:
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {currency}{item.amount}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center md:min-w-[200px]">
                {!item.cancelled ? (
                  <>
                    {!item.payment ? (
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition"
                      >
                        Pay Online
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-green-100 text-green-700 py-3 px-4 rounded-xl font-medium"
                      >
                        Payment Completed
                      </button>
                    )}

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="border border-red-300 text-red-500 hover:bg-red-500 hover:text-white py-3 px-4 rounded-xl font-medium transition"
                    >
                      Cancel Appointment
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="bg-red-50 text-red-500 border border-red-200 py-3 px-4 rounded-xl font-medium"
                  >
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No appointments found
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;