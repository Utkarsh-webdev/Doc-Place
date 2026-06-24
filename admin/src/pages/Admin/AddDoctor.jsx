import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [about, setAbout] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) return toast.error('Please upload doctor image');

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('about', about);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Only clears on success — data stays until you're done
        setDocImg(false); setName(''); setEmail(''); setPassword('');
        setExperience('1 Year'); setFees(''); setSpeciality('General physician');
        setDegree(''); setAddress1(''); setAddress2(''); setAbout('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const inputCls = 'w-full p-2 rounded-lg text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all';

  return (
  <div className="w-full p-6 bg-[#FAFBFC] min-h-screen">

    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Add Doctor
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Create a new doctor profile
      </p>
    </div>

    <form
      onSubmit={onSubmitHandler}
      className="bg-white border border-gray-100 rounded-xl p-8 max-w-5xl"
    >

      {/* Upload Image */}
      <div className="flex items-center gap-4 mb-8">

        <label
          htmlFor="doc-img"
          className="cursor-pointer"
        >
          <img
            className="w-20 h-20 rounded-full object-cover border border-gray-200"
            src={
              docImg
                ? URL.createObjectURL(docImg)
                : assets.upload_area
            }
            alt=""
          />
        </label>

        <input
          type="file"
          id="doc-img"
          hidden
          onChange={(e) =>
            setDocImg(e.target.files[0])
          }
        />

        <div>
          <p className="font-medium text-gray-700">
            Upload Doctor Photo
          </p>
          <p className="text-sm text-gray-500">
            JPG, PNG supported
          </p>
        </div>

      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor Name
            </label>

            <input
              className={inputCls}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              className={inputCls}
              type="email"
              placeholder="doctor@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              className={inputCls}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience
            </label>

            <select
              className={inputCls}
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
            >
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>4 Years</option>
              <option>5 Years</option>
              <option>10 Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Fee
            </label>

            <input
              className={inputCls}
              type="number"
              placeholder="₹500"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
            />
          </div>

        </div>

        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speciality
            </label>

            <select
              className={inputCls}
              value={speciality}
              onChange={(e) =>
                setSpeciality(e.target.value)
              }
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree
            </label>

            <input
              className={inputCls}
              type="text"
              placeholder="MBBS, MD"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>

            <input
              className={`${inputCls} mb-3`}
              type="text"
              placeholder="Address Line 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
            />

            <input
              className={inputCls}
              type="text"
              placeholder="Address Line 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
            />
          </div>

        </div>

      </div>

      {/* About */}
      <div className="mt-6">

        <label className="block text-sm font-medium text-gray-700 mb-2">
          About Doctor
        </label>

        <textarea
          rows="5"
          className={inputCls}
          placeholder="Doctor description..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />

      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-[#5F6FFF] text-white py-3 rounded-xl font-medium hover:bg-[#5263ff] transition-colors"
      >
        Add Doctor
      </button>

    </form>

  </div>
);
};

export default AddDoctor;