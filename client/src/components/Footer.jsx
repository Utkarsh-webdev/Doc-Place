import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
        
        {/* Left Section */}
        <div>
          <img
            className="mb-5 w-40"
            src={assets.logo}
            alt="Prescripto"
          />

          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Prescripto is your trusted healthcare partner, helping you
            connect with experienced doctors and book appointments with
            ease. Our mission is to make healthcare accessible,
            convenient, and reliable for everyone.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-800">
            COMPANY
          </p>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer hover:text-blue-500 transition">
              Home
            </li>
            <li className="cursor-pointer hover:text-blue-500 transition">
              About Us
            </li>
            <li className="cursor-pointer hover:text-blue-500 transition">
              Contact Us
            </li>
            <li className="cursor-pointer hover:text-blue-500 transition">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-800">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 98765 43210</li>
            <li>support@prescripto.com</li>
            <li>Kanpur, Uttar Pradesh</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div>
        <hr className="my-8 border-gray-300" />

        <p className="py-5 text-sm text-center text-gray-500">
          © 2026 DocTime. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;