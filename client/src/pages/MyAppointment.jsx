
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {

  const { doctors } = useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 py-10'>

      {/* Heading */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>
          My Appointments
        </h1>

        <p className='text-gray-500 mt-2'>
          View and manage your upcoming appointments
        </p>
      </div>

      {/* Appointment List */}
      <div className='space-y-5'>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5'
          >

            <div className='flex flex-col md:flex-row gap-6'>

              {/* Doctor Image */}
              <div className='flex justify-center md:justify-start'>
                <img
                  className='w-32 h-32 object-cover rounded-2xl bg-indigo-50'
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Doctor Details */}
              <div className='flex-1 text-sm text-zinc-600'>

                <div className='flex flex-wrap items-center gap-3'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    {item.name}
                  </h2>

                  <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium'>
                    Available
                  </span>
                </div>

                <p className='text-blue-600 font-medium mt-1'>
                  {item.speciality}
                </p>

                <div className='mt-4'>
                  <p className='font-semibold text-gray-700'>
                    Address
                  </p>

                  <p>{item.address?.line1}</p>
                  <p>{item.address?.line2}</p>
                </div>

                <div className='mt-4'>
                  <p className='font-semibold text-gray-700'>
                    Date & Time
                  </p>

                  <p className='text-gray-600'>
                    25 July 2025 • 10:30 AM
                  </p>
                </div>

                <div className='mt-4 flex items-center gap-3'>
                  <span className='font-semibold text-gray-700'>
                    Consultation Fee:
                  </span>

                  <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold'>
                    ₹{item.fees}
                  </span>
                </div>

              </div>

              {/* Buttons */}
              <div className='flex flex-col gap-3 justify-center md:min-w-[180px]'>

                <button className='bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300'>
                  Pay Online
                </button>

                <button className='border border-red-300 text-red-500 hover:bg-red-500 hover:text-white py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300'>
                  Cancel Appointment
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyAppointment

