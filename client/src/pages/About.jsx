import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 py-10'>

      {/* Heading */}
      <div className='text-center text-3xl pt-10 text-gray-600'>
        <p>
          ABOUT <span className='text-gray-800 font-semibold'>US</span>
        </p>
      </div>

      {/* About Content */}
      <div className='my-12 flex flex-col md:flex-row gap-12 items-center'>

        {/* Image */}
        <img
          className='w-full md:max-w-[400px] rounded-xl shadow-lg'
          src={assets.about_image}
          alt='About Us'
        />

        {/* Text */}
        <div className='flex flex-col justify-center gap-5 md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>

          <b className='text-gray-800 text-base'>Our Vision</b>

          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between
            patients and healthcare providers, making it easier for everyone to
            access quality medical care when they need it most.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-semibold text-gray-800'>
          WHY <span className='text-primary'>CHOOSE US</span>
        </h2>

        <p className='text-gray-500 mt-3'>
          Experience healthcare that's designed around your needs.
        </p>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>

        {/* Card 1 */}
        <div className='group bg-white p-8 rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
          <div className='w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-6'>
            <span className='text-2xl'>⚡</span>
          </div>

          <h3 className='text-xl font-bold text-gray-800 mb-3'>
            Efficiency
          </h3>

          <p className='text-gray-600 leading-8'>
            Book appointments in seconds with our streamlined scheduling
            system, saving you valuable time.
          </p>
        </div>

        {/* Card 2 */}
        <div className='group bg-white p-8 rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
          <div className='w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6'>
            <span className='text-2xl'>🏥</span>
          </div>

          <h3 className='text-xl font-bold text-gray-800 mb-3'>
            Convenience
          </h3>

          <p className='text-gray-600 leading-8'>
            Connect with experienced healthcare professionals anytime,
            anywhere through our trusted network.
          </p>
        </div>

        {/* Card 3 */}
        <div className='group bg-white p-8 rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer'>
          <div className='w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mb-6'>
            <span className='text-2xl'>❤️</span>
          </div>

          <h3 className='text-xl font-bold text-gray-800 mb-3'>
            Personal Care
          </h3>

          <p className='text-gray-600 leading-8'>
            Receive personalized recommendations, appointment reminders,
            and healthcare support tailored specifically to your needs.
          </p>
        </div>

      </div>

    </div>
  )
}

export default About