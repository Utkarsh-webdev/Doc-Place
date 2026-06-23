import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {

  const {
    dToken,
    profileData,
    getProfileData,
    updateProfileData,
    setProfileData,
  } = useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfileData({
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available,
        about: profileData.about,
      });
      setIsEdit(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (!profileData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
        <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="m-5">

      <div className="flex flex-col gap-5 max-w-5xl">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

          <div className="md:flex">

            <div className="md:w-72 flex-shrink-0 relative">
              <img
                className="w-full h-56 md:h-full object-cover bg-indigo-50"
                src={profileData.image}
                alt={profileData.name}
              />
              <span
                className={`absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${
                  profileData.available
                    ? "bg-green-50/90 text-green-700"
                    : "bg-gray-100/90 text-gray-500"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    profileData.available ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                {profileData.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="flex-1 p-8">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {profileData.name}
                  </h1>
                  <p className="text-indigo-600 font-medium text-sm mt-1">
                    {profileData.speciality}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <p className="text-gray-600 text-sm">{profileData.degree}</p>
                <span className="border border-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {profileData.experience}
                </span>
              </div>

              <div className="mt-6">
                <p className="font-semibold text-gray-800 text-sm mb-2">
                  About
                </p>

                {isEdit ? (
                  <textarea
                    rows={5}
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-colors resize-none"
                    value={profileData.about}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {profileData.about}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="font-semibold text-gray-800 text-sm">
                  Appointment Fee
                </span>

                {isEdit ? (
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-colors">
                    <span className="px-2.5 text-gray-400 text-sm">₹</span>
                    <input
                      type="number"
                      className="py-1.5 pr-3 w-24 text-sm focus:outline-none"
                      value={profileData.fees}
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : (
                  <span className="font-semibold text-gray-900">
                    ₹{profileData.fees}
                  </span>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Information */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

          <h2 className="font-semibold text-gray-800 mb-5">
            Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Email
              </p>
              <p className="text-gray-700 text-sm">{profileData.email}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Speciality
              </p>
              <p className="text-gray-700 text-sm">{profileData.speciality}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                Address
              </p>

              {isEdit ? (
                <div className="space-y-2">
                  <input
                    className="border border-gray-200 rounded-lg p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-colors"
                    placeholder="Address line 1"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                  />

                  <input
                    className="border border-gray-200 rounded-lg p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-colors"
                    placeholder="Address line 2"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              ) : (
                <>
                  <p className="text-gray-700 text-sm">{profileData.address?.line1}</p>
                  <p className="text-gray-700 text-sm">{profileData.address?.line2}</p>
                </>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                Availability
              </p>

              <label
                className={`inline-flex items-center gap-2.5 select-none ${
                  isEdit ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <button
                  type="button"
                  role="switch"
                  aria-checked={profileData.available}
                  disabled={!isEdit}
                  onClick={() =>
                    setProfileData(prev => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  className={`relative rounded-full transition-colors duration-200 disabled:cursor-default ${
                    profileData.available ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                  style={{ width: "40px", height: "22px" }}
                >
                  <span
                    className="absolute top-0.5 left-0.5 bg-white rounded-full shadow-sm transition-transform duration-200"
                    style={{
                      width: "18px",
                      height: "18px",
                      transform: profileData.available
                        ? "translateX(18px)"
                        : "translateX(0)",
                    }}
                  />
                </button>
                <span className="text-sm text-gray-700">
                  {profileData.available ? "Available for appointments" : "Not available"}
                </span>
              </label>
            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isEdit ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-full font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? "Saving…" : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEdit(false)}
                disabled={isSaving}
                className="px-8 py-2.5 rounded-full font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-60 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-indigo-600 text-indigo-600 px-8 py-2.5 rounded-full font-medium hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default DoctorProfile;