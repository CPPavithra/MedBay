import React, { useState } from "react";
import axios from "axios";
import "./form.css";
import helpImage from "./images/help.png"; // Ensure this image exists in your project

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    locationplace: "",
    helptype: "",
  });

  const [errors, setErrors] = useState({});

  // Regular expressions for validation
  const phoneRegex = /^[6-9]\d{9}$/;

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.match(phoneRegex)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.locationplace.trim()) newErrors.locationplace = "Location is required";
    if (!formData.helptype) newErrors.helptype = "Please select a help type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/submit", formData);
      alert(response.data.message);
      setFormData({
        name: "",
        phone: "",
        locationplace: "",
        helptype: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">MEDBAY</h1>
      <div className="image-container">
        <img src={helpImage} alt="Help Logo" className="help-image" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label><b>Name</b></label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label><b>Phone</b></label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="input-group">
          <label><b>Location</b></label>
          <input type="text" name="locationplace" value={formData.locationplace} onChange={handleChange} />
          {errors.locationplace && <p className="error">{errors.locationplace}</p>}
        </div>

        <div className="input-group">
          <label><b>Help-Type</b></label>
          <select name="helptype" value={formData.helptype} onChange={handleChange}>
            <option value="">Select Help</option>
            <option value="Ambulance">Ambulance</option>
            <option value="Fire">Fire</option>
            <option value="Medical">Medical</option>
            <option value="Other">Other</option>
          </select>
          {errors.helptype && <p className="error">{errors.helptype}</p>}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;

