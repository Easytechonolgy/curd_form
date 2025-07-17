import React, { useEffect, useState } from 'react';
import './addUser.css';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddUser = () => {
  const initialUser = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user", user);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { position: "top-right" });
    }
  };

  return (
    <div className='addUser'>
      <Link to="/" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <h3>Add new User</h3>
      <form className='AddUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            autoComplete='off'
            id='name'
            onChange={inputHandler}
            placeholder='Enter Your Name'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            autoComplete='off'
            id='email'
            onChange={inputHandler}
            placeholder='Enter Your Email'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            name='address'
            autoComplete='off'
            id='address'
            onChange={inputHandler}
            placeholder='Enter Your Address'
          />
        </div>
        <div className='inputGroup'>
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
