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
      if (!docImg) {
        return toast.error('Please upload doctor image');
      }

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

      formData.append(
        'address',
        JSON.stringify({
          line1: address1,
          line2: address2,
        })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: { aToken },
        }
      );

      if (data.success) {
        toast.success(data.message);

        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setSpeciality('General physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
        setAbout('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded-lg max-w-5xl">

        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 rounded-full bg-gray-100 cursor-pointer object-cover"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>

          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />

          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-600">

          <div className="flex flex-col gap-4">

            <div>
              <p className="mb-1">Doctor Name</p>
              <input
                className="border rounded w-full p-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="mb-1">Doctor Email</p>
              <input
                className="border rounded w-full p-2"
                type="email"
                placeholder="Doctor Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="mb-1">Doctor Password</p>
              <input
                className="border rounded w-full p-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="mb-1">Experience</p>
              <select
                className="border rounded w-full p-2"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
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
              <p className="mb-1">Fees</p>
              <input
                className="border rounded w-full p-2"
                type="number"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="flex flex-col gap-4">

            <div>
              <p className="mb-1">Speciality</p>
              <select
                className="border rounded w-full p-2"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
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
              <p className="mb-1">Degree</p>
              <input
                className="border rounded w-full p-2"
                type="text"
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="mb-1">Address</p>

              <input
                className="border rounded w-full p-2 mb-2"
                type="text"
                placeholder="Address Line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />

              <input
                className="border rounded w-full p-2"
                type="text"
                placeholder="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>

          </div>

        </div>

        <div className="mt-6">
          <p className="mb-2">About Doctor</p>

          <textarea
            rows="5"
            className="w-full border rounded p-3"
            placeholder="Write about doctor"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-[#5F6FFF] hover:bg-[#4F5DF4] text-white px-10 py-3 rounded-full transition-all"
        >
          Add Doctor
        </button>

      </div>
    </form>
  );
};

export default AddDoctor;