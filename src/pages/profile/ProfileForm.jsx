import React, { useState } from 'react';

const ProfileForm = () => {
  // State variables to hold form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    bio: '',
    profilePic: '',
    fullName: '',
    gender: 'Other',
    notifyPostLike: false,
    notifyPostDislike: false,
    notifyPostComment: false,
    notifyCommentLike: false,
    notifyCommentDislike: false,
    notifyMessages: false,
    onlySeeImp: false,
    approveFollow: false,
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfileForm;
