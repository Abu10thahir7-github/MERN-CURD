import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import users_iocn from './assets/user.png'
function GetUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getUser");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${id}`);
      fetchUsers(); // Fetch updated user list
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateUser = () => {
    navigate("/create");
  };

  const handleEdit = (id) => {
    navigate(`/editUser/${id}`);
  };

  const filteredUsers = users.filter((user) => {
    return Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleFilter = () => {
    if (!filterActive) {
      setFilterActive(true);
      let filteredData = users.filter((user) => {
        let match = true;
        const ageFilter = document.getElementById("age").value;
        const placeFilter = document.getElementById("place").value;
        const genderFilter = document.getElementById("gender").value;
        if (ageFilter === "10+") {
          if (user.age < 10) {
            match = false;
          }
        } else if (ageFilter === "10-") {
          if (user.age >= 10) {
            match = false;
          }
        } else if (ageFilter === "18+") {
          if (user.age < 18) {
            match = false;
          }
        } else if (ageFilter === "18-") {
          if (user.age >= 18) {
            match = false;
          }
        } else if (ageFilter === "20+") {
          if (user.age < 20) {
            match = false;
          }
        } else if (ageFilter === "20-") {
          if (user.age >= 20) {
            match = false;
          }
        } else if (ageFilter === "25+") {
          if (user.age < 25) {
            match = false;
          }
        } else if (ageFilter === "25-") {
          if (user.age >= 25) {
            match = false;
          }
        } else if (ageFilter === "30+") {
          if (user.age < 30) {
            match = false;
          }
        } else if (ageFilter === "30-") {
          if (user.age >= 30) {
            match = false;
          }
        } else if (ageFilter === "40+") {
          if (user.age < 40) {
            match = false;
          }
        } else if (ageFilter === "40-") {
          if (user.age >= 40) {
            match = false;
          }
        } else if (ageFilter === "50+") {
          if (user.age < 50) {
            match = false;
          }
        } else if (ageFilter === "50-") {
          if (user.age >= 50) {
            match = false;
          }
        } else if (ageFilter === "60+") {
          if (user.age < 60) {
            match = false;
          }
        } else if (ageFilter === "60-") {
          if (user.age >= 60) {
            match = false;
          }
        }

        if (placeFilter && user.place !== placeFilter) {
          match = false;
        }

        if (genderFilter && user.gender !== genderFilter) {
          match = false;
        }

        return match;
      });
      setUsers(filteredData);
    } else {
      // Clear filter
      setFilterActive(false);
      setSearchTerm("");
      fetchUsers();
    }
  };

  return (
    <div className="get">
      <h1>Users</h1>
      <div className="get-con">
        <div className="fil-ser">
          <div className="search">
            <div className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              type="text"
              placeholder="Search User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={handleFilter}>
  <FontAwesomeIcon icon={faFilter} /> {filterActive ? "Clear Filter" : "Filter"}
</button>

          <div className="age-fil option">
            <label htmlFor="">Age</label>
            <select id="age">
              <option value=""> </option>
              <option value="10+">10+</option>
              <option value="10-">10-</option>
              <option value="18+">18+</option>
              <option value="18-">18-</option>
              <option value="20+">20+</option>
              <option value="20-">20-</option>
              <option value="25+">25+</option>
              <option value="25-">25-</option>
              <option value="30+">30+</option>
              <option value="30-">30-</option>
              <option value="40+">40+</option>
              <option value="40-">40-</option>
              <option value="50+">50+</option>
              <option value="50-">50-</option>
              <option value="60+">60+</option>
              <option value="60-">60-</option>
            </select>
          </div>
          <div className="address-fil option">
            <label htmlFor="">Place</label>
            <select id="place">
              <option value=""> </option>
              <option value="Palakkad">Palakkad</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Idukki">Idukki</option>
              <option value="Kannur">Kannur</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Kasaragod">Kasaragod</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Pathanamthitta">Pathanamthitta</option>
              <option value="Kollam">Kollam</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
            </select>
          </div>
          <div className="Male-female option">
            <label htmlFor="">Gender</label>
            <select id="gender">
              <option value=""> </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="btn-add">
          <button onClick={handleCreateUser}>Add User</button>
        </div>
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Age</th>
            {/* <th>Address</th> */}
            <th>Phone</th>
            <th>country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
             <td className="img-row">
               {user.image ? (
                 <img src={user.image} alt="" />
               ) : (
                 <img src={users_iocn} alt="Default Image" />
               )}
             </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              {/* <td>{user.address}</td> */}
              <td>{user.phone}</td>
              <td>{user.country}</td>
              <td>
                <div className="btn">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faEdit}
                    onClick={() => handleEdit(user._id)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <FontAwesomeIcon
                    className="icon"
                    icon={faTrash}
                    onClick={() => handleDelete(user._id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetUsers;
