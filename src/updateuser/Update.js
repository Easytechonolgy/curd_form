import React, { useEffect, useState } from 'react'
import './update.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUser = () => {
    const users = {
        name: "",
        email: "",
        address: "",
    };

    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const { id } = useParams();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Failed to load user:", error);
            });
    }, [id])

    const submitForm = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8000/api/user/${id}`, user)

        .then((response) => {
            toast.success(response.data.message, { position: "top-right" });
            navigate("/");
        })
        .catch((error) => {
            console.log("Update failed:", error);
            toast.error("Failed to update user.", { position: "top-right" });
        });
};

return (
    <div className='addUser'>
        <Link to="/" className="btn btn-secondary">
            <i className="fa-solid fa-backward"></i> Back
        </Link>
        <h3>Update User</h3>
        <form className='AddUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    name='name'
                    autoComplete='off'
                    id='name'
                    value={user.name}
                    onChange={inputHandler}
                    placeholder='Enter Your Name' />
            </div>
            <div className='inputGroup'>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    name='email'
                    autoComplete='off'
                    id='email'
                    value={user.email}
                    onChange={inputHandler}
                    placeholder='Enter Your Email' />
            </div>
            <div className='inputGroup'>
                <label htmlFor='address'>Address:</label>
                <input
                    type='text'
                    name='address'
                    autoComplete='off'
                    id='address'
                    value={user.address}
                    onChange={inputHandler}
                    placeholder='Enter Your Address' />
            </div>
            <div className='inputGroup'>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
)
}

export default UpdateUser;
