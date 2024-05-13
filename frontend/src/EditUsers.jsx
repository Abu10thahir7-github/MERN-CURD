// EditUser.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    address: "",
    phone: "",
    place: "",
    image: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/getUser/${id}`);
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevUserData) => ({
      ...prevUserData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("gender", userData.gender);
    formData.append("age", userData.age);
    formData.append("address", userData.address);
    formData.append("phone", userData.phone);
    formData.append("country", userData.country);
    formData.append("image", userData.image);

    try {
      await axios.put(`http://localhost:5000/updateUser/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Redirect or handle success
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Côte d'Ivoire",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  return (
    <div className="edit">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="text"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <div className="radio">
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value="male"
              checked={userData.gender === "male"}
              onChange={handleChange}
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value="female"
              checked={userData.gender === "female"}
              onChange={handleChange}
            />
          </label>
          <label>
            Other
            <input
              type="radio"
              name="gender"
              value="other"
              checked={userData.gender === "other"}
              onChange={handleChange}
            />
          </label>
        </div>
        <input
          className="input"
          type="text"
          name="age"
          value={userData.age}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          required
        />
        <select
          name="country"
          id="country"
          value={userData.country}
          className="select-con"
          a
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countries.sort().map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          className="file"
          onChange={handleFileChange}
        />
        {/* Conditionally render old image */}
        {userData.image && !userData.image.name && (
          <img
            src={userData.image}
            alt="Old"
            style={{ width: "150px", height: "auto" }}
          />
        )}
        {/* Conditionally render new image */}
        {userData.image && userData.image.name && (
          <img
            src={URL.createObjectURL(userData.image)}
            style={{ width: "150px", height: "auto" }}
            alt="New"
          />
        )}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
