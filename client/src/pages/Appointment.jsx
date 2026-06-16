import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
    loadUserProfileData,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = () => {
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        currentDate.setSeconds(0);

        if (currentDate >= endTime) continue;
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // ✅ Build slotDate key and check against slot_booked
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isSlotBooked =
  docInfo?.slots_booked?.[slotDate]?.includes(formattedTime);
  

        // Push all slots (both booked and available) so UI can show booked state
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          isBooked: !!isSlotBooked,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (timeSlots.length > 0) {
        allSlots.push(timeSlots);
      }
    }

    setDocSlots(allSlots);
  };

  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  const bookAppointment = async () => {
    try {
      if (!token) {
        toast.warning("Login to book an appointment");
        return navigate("/login");
      }

      if (!slotTime) {
        toast.warning("Please select a slot");
        return;
      }

      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      // ✅ Consistent field name: slot_booked
      const isSlotBooked =
  docInfo?.slots_booked?.[slotDate]?.includes(slotTime);

if (isSlotBooked) {
  toast.error("This slot is already booked");
  return;
}

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDoctorsData();
        if (loadUserProfileData) await loadUserProfileData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500 text-lg">Loading Doctor Details...</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div>
          <img
            className="bg-blue-50 w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 border border-gray-200 rounded-lg p-8 bg-white">
          <p className="flex items-center gap-2 text-3xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-1 px-3 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          <div className="mt-6">
            <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
              About
              <img className="w-4" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-2 leading-6">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-700 font-medium mt-6">
            Appointment Fee :
            <span className="text-blue-600 ml-2">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-10 font-medium text-gray-700">
        <p>Booking Slots</p>

        {/* Days */}
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer border ${
                slotIndex === index
                  ? "bg-blue-500 text-white"
                  : "border-gray-200"
              }`}
            >
              <p>
                {item[0] &&
                  item[0].datetime.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
              </p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots — booked slots shown in red, disabled */}
        <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
          {docSlots.length > 0 &&
            docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => !item.isBooked && setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full border transition-all
                  ${
                    item.isBooked
                      ? "bg-red-50 text-red-400 border-red-200 cursor-not-allowed line-through"
                      : item.time === slotTime
                      ? "bg-blue-500 text-white border-blue-500 cursor-pointer"
                      : "text-gray-400 border-gray-300 cursor-pointer hover:border-blue-300"
                  }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-8 hover:bg-blue-600 transition"
        >
          Book an Appointment
        </button>
      </div>

      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;