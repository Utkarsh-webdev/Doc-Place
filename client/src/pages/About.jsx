import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 py-10'>

      {/* Heading */}
      <div className='text-center pt-10'>
        <h1 className='text-3xl font-bold text-gray-800'>
          About <span className='text-[#5F6FFF]'>DocTime</span>
        </h1>
        <p className='mt-3 text-gray-500 max-w-2xl mx-auto'>
          Making healthcare simpler, faster, and more accessible for everyone.
        </p>
      </div>

      {/* About Section */}
      <div className='my-16 flex flex-col md:flex-row items-stretch gap-10 md:gap-12'>

        {/* Image */}
        <div className='md:w-1/2 flex'>
          <img
            className='w-full h-full max-h-[480px] object-cover rounded-2xl shadow-lg'
            src={assets.about_image}
            alt='About DocTime'
          />
        </div>

        {/* Content */}
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600'>

          <p className='leading-8'>
            Welcome to <span className='font-semibold text-[#5F6FFF]'>DocTime</span>,
            your trusted digital healthcare platform designed to simplify the
            way people connect with doctors. Whether you need a routine health
            check-up or specialist consultation, DocTime helps you book
            appointments quickly and securely from anywhere.
          </p>

          <p className='leading-8'>
            At DocTime, we believe healthcare should be convenient, reliable,
            and accessible to everyone. Our platform connects patients with
            qualified healthcare professionals while providing an intuitive and
            hassle-free appointment booking experience. We continuously improve
            our technology to make healthcare management easier for patients
            and doctors alike.
          </p>

          <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              Our Vision
            </h2>

            <p className='leading-8'>
              Our vision is to transform healthcare through technology by
              creating a trusted ecosystem where patients can easily discover
              doctors, schedule appointments, and receive quality medical care
              without unnecessary delays. We strive to make healthcare more
              accessible, efficient, and patient-friendly.
            </p>
          </div>

        </div>

      </div>

      {/* Why Choose Us */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>
          Why Choose <span className='text-[#5F6FFF]'>DocTime?</span>
        </h2>

        <p className='text-gray-500 mt-3'>
          Experience modern healthcare with simplicity, speed, and trust.
        </p>
      </div>

      {/* Features */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>

        {/* Card 1 */}
        <div className='bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>

          <div className='w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl mb-6'>
            ⚡
          </div>

          <h3 className='text-xl font-semibold text-gray-800 mb-3'>
            Fast Appointment Booking
          </h3>

          <p className='text-gray-600 leading-7'>
            Schedule doctor appointments within minutes through our fast,
            secure, and user-friendly booking system designed to save your
            valuable time.
          </p>

        </div>

        {/* Card 2 */}
        <div className='bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>

          <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl mb-6'>
            🩺
          </div>

          <h3 className='text-xl font-semibold text-gray-800 mb-3'>
            Verified Doctors
          </h3>

          <p className='text-gray-600 leading-7'>
            Connect with experienced and verified healthcare professionals
            across multiple medical specialties, ensuring trusted and quality
            care.
          </p>

        </div>

        {/* Card 3 */}
        <div className='bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>

          <div className='w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl mb-6'>
            ❤️
          </div>

          <h3 className='text-xl font-semibold text-gray-800 mb-3'>
            Personalized Healthcare
          </h3>

          <p className='text-gray-600 leading-7'>
            Manage appointments, receive timely reminders, and enjoy a
            healthcare experience tailored to your individual medical needs.
          </p>

        </div>

      </div>

    </div>
  )
}

export default About