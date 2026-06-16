import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { backendUrl, token } =
    useContext(AppContext);

  const [appointments, setAppointments] =
    useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");

    return `${dateArray[0]} ${
      months[Number(dateArray[1]) - 1]
    } ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments`,
        {
          headers: { token },
        }
      );

      if (data.success) {
        setAppointments(
          data.appointments.reverse()
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (
    appointmentId
  ) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
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

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 py-10">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Appointments
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage your upcoming
          appointments
        </p>
      </div>

      {/* Appointment List */}
      <div className="space-y-5">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor Image */}
              <div className="flex justify-center md:justify-start">
                <img
                  className="w-32 h-32 object-cover rounded-2xl bg-indigo-50"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1 text-sm text-zinc-600">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.docData.name}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.cancelled
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.cancelled
                      ? "Cancelled"
                      : "Booked"}
                  </span>
                </div>

                <p className="text-blue-600 font-medium mt-1">
                  {item.docData.speciality}
                </p>

                <div className="mt-4">
                  <p className="font-semibold text-gray-700">
                    Address
                  </p>

                  <p>
                    {
                      item.docData.address
                        ?.line1
                    }
                  </p>

                  <p>
                    {
                      item.docData.address
                        ?.line2
                    }
                  </p>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-700">
                    Date & Time
                  </p>

                  <p className="text-gray-600">
                    {slotDateFormat(
                      item.slotDate
                    )}{" "}
                    | {item.slotTime}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="font-semibold text-gray-700">
                    Consultation Fee:
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{item.amount}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 justify-center md:min-w-[180px]">
                {!item.cancelled ? (
                  <>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300">
                      Pay Online
                    </button>

                    <button
                      onClick={() =>
                        cancelAppointment(
                          item._id
                        )
                      }
                      className="border border-red-300 text-red-500 hover:bg-red-500 hover:text-white py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300"
                    >
                      Cancel Appointment
                    </button>
                  </>
                ) : (
                  <button className="py-3 px-4 border border-red-500 rounded-xl text-red-500 bg-red-50 cursor-not-allowed">
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