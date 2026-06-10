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
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium text-gray-700">Add Doctor</p>

      <div
        className="bg-white px-8 py-8 max-w-5xl"
        style={{ borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 20px rgba(0,0,0,0.06)' }}
      >
        {/* Photo upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 rounded-full object-cover bg-gray-100"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
            />
          </label>
          <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
          <p className="text-sm text-gray-500 leading-relaxed">Upload doctor <br /> picture</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-600">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Doctor Name</p>
              <input className={inputCls} type="text" placeholder="Full name"
                value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Email Address</p>
              <input className={inputCls} type="email" placeholder="doctor@clinic.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Password</p>
              <input className={inputCls} type="password" placeholder="Set password"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Experience</p>
              <select className={inputCls} value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option>1 Year</option><option>2 Years</option><option>3 Years</option>
                <option>4 Years</option><option>5 Years</option><option>10 Years</option>
              </select>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Fees</p>
              <input className={inputCls} type="number" placeholder="Consultation fee"
                value={fees} onChange={(e) => setFees(e.target.value)} required />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Speciality</p>
              <select className={inputCls} value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                <option>General physician</option><option>Gynecologist</option>
                <option>Dermatologist</option><option>Pediatricians</option>
                <option>Neurologist</option><option>Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Degree</p>
              <input className={inputCls} type="text" placeholder="e.g. MBBS, MD"
                value={degree} onChange={(e) => setDegree(e.target.value)} required />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Address</p>
              <input className={`${inputCls} mb-2`} type="text" placeholder="Address Line 1"
                value={address1} onChange={(e) => setAddress1(e.target.value)} required />
              <input className={inputCls} type="text" placeholder="Address Line 2"
                value={address2} onChange={(e) => setAddress2(e.target.value)} required />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gray-600">About Doctor</p>
          <textarea
            rows="5"
            className={inputCls}
            placeholder="Write about the doctor"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-[#5F6FFF] hover:bg-[#4F5DF4] text-white px-10 py-3 rounded-full transition-all text-sm font-medium"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;