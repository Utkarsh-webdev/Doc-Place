import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  // ================= GET ALL DOCTORS =================
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/list`
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ================= LOAD USER PROFILE =================
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-profile`,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ================= LOAD DOCTORS =================
  useEffect(() => {
    getDoctorsData();
  }, []);

  // ================= LOAD USER DATA WHEN TOKEN CHANGES =================
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  const value = {
    doctors,
    setDoctors,
    currencySymbol,
    backendUrl,

    token,
    setToken,

    userData,
    setUserData,

    getDoctorsData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;