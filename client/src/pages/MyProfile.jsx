import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {

  const [isEdit, setIsEdit] = useState(false)

  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    image: assets.profile_pic,
    email: 'edward@example.com',
    phone: '+91 9876543210',
    address: {
      line1: '123 Main Street',
      line2: 'Kanpur, Uttar Pradesh',
    },
    gender: 'Male',
    dob: '15 January 2000',
  })

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      <img
        className='w-36 rounded-lg'
        src={userData.image}
        alt={userData.name}
      />

      {isEdit ? (
        <input
          className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 border rounded px-2 py-1'
          type='text'
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      ) : (
        <p className='text-3xl font-medium text-gray-800 mt-4'>
          {userData.name}
        </p>
      )}

      <hr className='bg-zinc-300 h-[1px] border-none' />

      {/* Contact Information */}
      <div>
        <p className='text-gray-500 underline mt-4'>
          CONTACT INFORMATION
        </p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-4'>

          <p className='font-medium'>Email:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>

          {isEdit ? (
            <input
              className='bg-gray-50 max-w-52 border rounded px-2 py-1'
              type='text'
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className='font-medium'>Address:</p>

          {isEdit ? (
            <div>
              <input
                className='bg-gray-50 w-full border rounded px-2 py-1'
                type='text'
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value,
                    },
                  }))
                }
              />

              <input
                className='bg-gray-50 w-full border rounded px-2 py-1 mt-2'
                type='text'
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
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
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className='text-gray-500 underline mt-6'>
          BASIC INFORMATION
        </p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-4'>

          <p className='font-medium'>Gender:</p>

          {isEdit ? (
            <select
              className='max-w-32 border rounded px-2 py-1'
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className='font-medium'>Birthday:</p>

          {isEdit ? (
            <input
              className='max-w-40 border rounded px-2 py-1'
              type='date'
              value='2000-01-15'
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Button */}
      <button
  onClick={() => setIsEdit(!isEdit)}
  className='border border-blue-500 text-blue-500 px-8 py-2 rounded-full mt-8 hover:bg-blue-500 hover:text-white transition-all duration-300 w-fit'
>
  {isEdit ? 'Save Information' : 'Edit Profile'}
</button>

    </div>
  )
}

export default MyProfile