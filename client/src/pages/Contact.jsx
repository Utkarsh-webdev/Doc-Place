import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 py-10'>

      {/* Heading */}
      <div className='text-center pt-10'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Contact <span className='text-[#5F6FFF]'>DocTime</span>
        </h1>

        <p className='mt-3 text-gray-500 max-w-2xl mx-auto'>
          We'd love to hear from you. Whether you have a question, feedback,
          or need assistance, our team is here to help.
        </p>
      </div>

      {/* Contact Section */}
      <div className='my-16 flex flex-col md:flex-row items-stretch gap-10 md:gap-12'>

        {/* Image */}
        <div className='md:w-1/2 flex'>
          <img
            className='w-full h-full max-h-[480px] object-cover rounded-2xl shadow-lg'
            src={assets.contact_image}
            alt='Contact DocTime'
          />
        </div>

        {/* Details */}
        <div className='flex flex-col justify-center gap-8 text-gray-600 md:w-1/2'>

          {/* Office */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
              Our Office
            </h2>

            <p className='leading-8'>
              DocTime Healthcare Pvt. Ltd.
              <br />
              Kanpur, Uttar Pradesh
              <br />
              India
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
              Contact Information
            </h2>

            <div className='space-y-2'>
              <p>📞 +91 98765 43210</p>
              <p>📧 support@doctime.com</p>
              <p>
                🕒 Monday - Saturday
                <br />
                9:00 AM - 7:00 PM
              </p>
            </div>
          </div>

          {/* Careers */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
              Careers at DocTime
            </h2>

            <p className='leading-7'>
              Join our mission of making healthcare smarter and more
              accessible. We're always looking for passionate individuals
              who want to make a real impact.
            </p>
          </div>

          <button className='w-fit bg-[#5F6FFF] text-white px-8 py-3 rounded-xl hover:bg-[#4e5ef7] transition-all duration-300 shadow-sm hover:shadow-md'>
            Explore Careers
          </button>

        </div>

      </div>

    </div>
  )
}

export default Contact