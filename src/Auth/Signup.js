/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

const SignupForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    encrypted_password: '',
    first_name: '',
    last_name: '',
    age: '',
    is_admin: false, // Default value for isAdmin
  });

  // Fetch CSRF token from backend upon component mount
  useEffect(() => {
    fetch('http://localhost:3000/csrf-token', {
      method: 'GET',
      credentials: 'include', // Ensure cookies are sent
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('CSRF Token:', data.csrfToken);
        setCsrfToken((prevToken) => {
          console.log('Previous CSRF Token:', prevToken);
          console.log('New CSRF Token:', data.csrfToken);
          return data.csrfToken;
        });
      })
      .catch((error) => console.error('Error fetching CSRF token:', error));
  }, []);

  // Log the csrfToken whenever it changes
  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'age') {
      newValue = parseInt(value, 10);
    } else {
      newValue = value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend API for signup
    fetch('http://localhost:3000/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // Include CSRF token in headers
      },
      body: JSON.stringify(formData),
      credentials: 'include', // Ensure cookies are sent
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        // Handle successful signup, e.g., redirect to another page
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., display error message to the user
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="encrypted_password" value={formData.encrypted_password} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="password">Password-Confirmation:</label>
        <input type="password" id="password" name="encrypted_password" value={formData.encrypted_password} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
      </div>

      <div>
        <input type="checkbox" id="is_admin" name="is_admin" checked={formData.is_admin} onChange={handleChange} />
        <label htmlFor="is_admin">Is Admin</label>
      </div>

      <button type="submit">Signup</button>
    </form>

  );
};

export default SignupForm;
