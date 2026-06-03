import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 py-10'>

      {/* Heading */}
      <div className='text-center text-3xl pt-10 text-gray-600'>
        <p>
          CONTACT <span className='text-gray-800 font-semibold'>US</span>
        </p>
      </div>

      {/* Contact Content */}
      <div className='my-16 flex flex-col md:flex-row items-center gap-12'>

        {/* Image */}
        <img
          className='w-full md:max-w-[420px] rounded-xl shadow-lg'
          src={assets.contact_image}
          alt='Contact Us'
        />

        {/* Details */}
        <div className='flex flex-col items-start gap-6 text-gray-600'>

          <h2 className='text-2xl font-semibold text-gray-800'>
            OUR OFFICE
          </h2>

          <p>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          <div>
            <p>Tel: (415) 555-0132</p>
            <p>Email: support@prescripto.com</p>
          </div>

          <h3 className='text-xl font-semibold text-gray-800'>
            CAREERS AT PRESCRIPTO
          </h3>

          <p>
            Learn more about our teams and job openings.
          </p>

          <button className='border border-gray-800 px-8 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300'>
            Explore Jobs
          </button>

        </div>
      </div>

    </div>
  )
}

export default Contact