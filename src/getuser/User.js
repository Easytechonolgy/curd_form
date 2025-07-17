import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Failed to delete user", { position: "top-right" });
    }
  };

  return (
    <div className='userTable'>
      <Link to="/add" className="btn btn-primary">
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>S.NO</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Address</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className='actionButton'>
                  <Link to={`/update/${user._id}`} className="btn btn-info">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button onClick={() => deleteUser(user._id)} className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default User;
