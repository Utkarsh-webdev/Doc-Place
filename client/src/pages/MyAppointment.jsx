import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {

  const { doctors } = useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 py-10'>

      <p className='pb-4 text-lg font-medium text-gray-700 border-b'>
        My Appointments
      </p>

      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-6 border-b'
          >
            {/* Doctor Image */}
            <div>
              <img
                className='w-32 bg-indigo-50 rounded-lg'
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Details */}
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>
                {item.name}
              </p>

              <p>{item.speciality}</p>

              <p className='text-zinc-700 font-medium mt-2'>
                Address:
              </p>

              <p>{item.address?.line1}</p>
              <p>{item.address?.line2}</p>

              <p className='mt-2'>
                <span className='font-medium'>Date & Time:</span>{' '}
                25 July 2025 | 10:30 AM
              </p>
            </div>

            {/* Buttons */}
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 border border-gray-300 rounded py-2 px-4 hover:bg-blue-500 hover:text-white transition-all'>
                Pay Online
              </button>

              <button className='text-sm text-stone-500 border border-gray-300 rounded py-2 px-4 hover:bg-red-500 hover:text-white transition-all'>
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default MyAppointment