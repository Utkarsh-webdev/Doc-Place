import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const {
    doctors,
    aToken,
    getAllDoctors,
    changeAvailability
  } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">

      <h1 className="text-xl font-semibold text-gray-700 mb-5">
        All Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

        {doctors.map((item) => (

          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-52 object-cover bg-[#EEF2FF]"
            />

            <div className="p-3">

              <p className="text-[15px] font-semibold text-gray-800">
                {item.name}
              </p>

              <p className="text-sm text-gray-500">
                {item.speciality}
              </p>

              <div
                onClick={() => changeAvailability(item._id)}
                className="flex items-center gap-2 mt-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={item.available}
                  readOnly
                  className="cursor-pointer"
                />

                <p className="text-xs text-gray-500">
                  Available
                </p>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default DoctorsList